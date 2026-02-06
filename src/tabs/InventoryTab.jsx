import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal } from '../components/Modal';
import { useCharacter } from '../context/CharacterContext';
import { useToast } from '../components/Toast';
import IconPicker from '../components/IconPicker';
import { stringifyForCompendium } from '../utils/exportUtils';
import { ITEM_COLORS } from '../data/rules';

const InventoryTab = () => {
    const {
        characterData, isEditMode, isDevMode,
        addInventoryItem, updateInventoryItem, deleteInventoryItem,
        addPeculiarity, updatePeculiarity, deletePeculiarity,
        updateBiography, updateCurrency, theme
    } = useCharacter();
    const { showToast } = useToast();

    // Inventory State
    const [editingItem, setEditingItem] = useState(null);
    const [itemForm, setItemForm] = useState({ name: '', icon: 'fa-box', qty: 1, currentUses: 0, maxUses: 0, type: 'Outro', price: '', weight: 0, description: '', equipped: false });
    const [itemToDelete, setItemToDelete] = useState(null);

    // Peculiarities State
    const [editingPec, setEditingPec] = useState(null);
    const [viewingPec, setViewingPec] = useState(null);
    const [pecForm, setPecForm] = useState({ name: '', val: '+0', description: '', type: 'Mundana' });
    const [pecToDelete, setPecToDelete] = useState(null);

    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    const items = characterData.inventory || [];
    const peculiarities = characterData.peculiarities || [];
    const currency = characterData.currency || { po: 0, pp: 0, pc: 0 };
    const biography = characterData.biography || "";

    // Item Handlers
    const openAddItemModal = () => {
        setEditingItem(null);
        setItemForm({ name: '', icon: 'fa-box', qty: 1, currentUses: 0, maxUses: 0, type: 'Outro', price: '', weight: 0, description: '', equipped: false });
        setEditingItem('new');
    };

    const openEditItemModal = (item) => {
        setEditingItem(item);
        setItemForm(item);
    };

    const handleSaveItem = () => {
        const validatedItem = {
            ...itemForm,
            currentUses: Math.min(Math.max(0, itemForm.currentUses), itemForm.maxUses)
        };

        if (editingItem === 'new') {
            addInventoryItem(validatedItem);
            showToast(`ITEM "${validatedItem.name}" ADICIONADO`, 'success');
        } else {
            updateInventoryItem(editingItem.id, validatedItem);
            showToast(`ITEM "${validatedItem.name}" ATUALIZADO`, 'success');
        }
        setEditingItem(null);
    };

    const confirmDeleteItem = () => {
        if (itemToDelete) {
            deleteInventoryItem(itemToDelete.id);
            showToast(`ITEM "${itemToDelete.name}" EXCLUÍDO`, 'warning');
            setItemToDelete(null);
            setEditingItem(null);
        }
    };

    // Peculiarity Handlers
    const openAddPecModal = () => {
        setEditingPec(null);
        setPecForm({ name: '', val: '+0', description: '', type: 'Mundana' });
        setEditingPec('new');
    };

    const openEditPecModal = (pec) => {
        setEditingPec(pec);
        setPecForm(pec);
    };

    const handleSavePec = () => {
        if (editingPec === 'new') {
            addPeculiarity(pecForm);
            showToast(`PECULIARIDADE "${pecForm.name}" ADICIONADA`, 'success');
        } else {
            updatePeculiarity(editingPec.id, pecForm);
            showToast(`PECULIARIDADE "${pecForm.name}" ATUALIZADA`, 'success');
        }
        setEditingPec(null);
    };

    const confirmDeletePec = () => {
        if (pecToDelete) {
            deletePeculiarity(pecToDelete.id);
            showToast(`PECULIARIDADE "${pecToDelete.name}" EXCLUÍDA`, 'warning');
            setPecToDelete(null);
            setEditingPec(null);
        }
    };

    const handleExportToCompendium = (data, type) => {
        let exportData = { ...data };
        delete exportData.id;

        if (type === 'item') {
            delete exportData.currentUses;
        }

        const code = stringifyForCompendium(exportData);
        navigator.clipboard.writeText(code + ',');
        showToast('CÓDIGO COPIADO PARA O COMPÊNDIO!', 'success');
    };

    const getPeculiaritiesMeta = (val, type) => {
        const numVal = parseInt(val.replace(/[^\d-]/g, '')) || 0;

        const typeIcons = {
            'Mundana': 'fa-user',
            'Bestial': 'fa-paw',
            'Extraordinária': 'fa-sparkles',
            'Sobrenatural': 'fa-ghost',
            'Mágica': 'fa-wand-magic-sparkles'
        };

        const icon = typeIcons[type] || 'fa-circle-dot';

        if (numVal > 0) return { icon, color: 'text-cyber-yellow', valColor: 'text-[#00ff99]' };
        if (numVal < 0) return { icon, color: 'text-cyber-pink', valColor: 'text-red-400' };
        return { icon, color: 'text-cyber-gray', valColor: 'text-cyber-gray' };
    };

    const getItemColor = (item) => {
        return ITEM_COLORS[item.type] || 'text-item-outro';
    };

    const totalWeight = items.reduce((acc, item) => acc + (parseFloat(item.weight) * parseInt(item.qty) || 0), 0);

    const groupedItems = items.reduce((acc, item) => {
        const type = item.type || 'Outro';
        if (!acc[type]) acc[type] = [];
        acc[type].push(item);
        return acc;
    }, {});

    const itemTypeOrder = ['Arma', 'Armadura', 'Ferramenta', 'Consumível', 'Outro'];
    const sortedTypes = Object.keys(groupedItems).sort((a, b) => {
        const indexA = itemTypeOrder.indexOf(a);
        const indexB = itemTypeOrder.indexOf(b);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.localeCompare(b);
    });

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto min-h-[600px]">
                <article className="lg:col-span-8 glass-card rounded-xl border border-white/10 flex overflow-hidden">
                    <div className="w-10 md:w-12 border-r border-white/10 flex flex-col justify-between items-center py-6 text-xs text-cyber-gray font-mono tracking-widest select-none bg-black/40">
                        <div className="writing-vertical-lr text-white font-bold text-lg mt-4 font-display uppercase tracking-widest">INVENTÁRIO</div>
                        <div className="h-full w-[1px] bg-gray-800 my-4"></div>
                        <div className="writing-vertical-lr text-cyber-gray font-mono tracking-widest mb-4">SISTEMA DE CARGA</div>
                    </div>
                    <div className="flex-grow flex flex-col bg-transparent pl-2">
                        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-4">
                                <h2 className="text-lg font-bold text-white tracking-wide font-display">FILTRO DE CARGA</h2>
                                {isEditMode && (
                                    <button
                                        onClick={openAddItemModal}
                                        className="w-7 h-7 rounded bg-cyber-pink/20 border border-cyber-pink/40 text-cyber-pink hover:bg-cyber-pink/30 hover:shadow-neon-pink transition-all flex items-center justify-center p-0"
                                    >
                                        <i className="fa-solid fa-plus text-[10px]"></i>
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-3 mt-3 md:mt-0">
                                {[
                                    { label: 'PO', key: 'po', color: 'text-cyber-yellow' },
                                    { label: 'PP', key: 'pp', color: 'text-gray-400' },
                                    { label: 'PC', key: 'pc', color: 'text-orange-400' }
                                ].map(coin => (
                                    <div key={coin.key} className={`flex items-center bg-black/40 border border-white/10 rounded px-2 py-1 focus-within:border-white transition-all`}>
                                        <label className={`${coin.color} font-bold text-[10px] mr-2 font-mono uppercase tracking-tighter`}>{coin.label}</label>
                                        {isEditMode ? (
                                            <input
                                                className="bg-transparent border-none p-0 w-16 text-right text-white text-sm font-mono focus:ring-0 outline-none"
                                                type="number"
                                                min="0"
                                                value={currency[coin.key]}
                                                onChange={(e) => updateCurrency(coin.key, e.target.value)}
                                            />
                                        ) : (
                                            <span className="text-white text-sm font-mono">{currency[coin.key]}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-2">
                            <table className="w-full text-left border-collapse">
                                <thead className="text-[10px] uppercase text-cyber-gray font-semibold tracking-wider sticky top-0 bg-cyber-bg z-10 p-2">
                                    <tr>
                                        <th className="p-2 w-8"></th>
                                        <th className="p-2">Item</th>
                                        <th className="p-2 text-center">Qtd.</th>
                                        <th className="p-2 text-center">Usos</th>
                                        <th className="p-2">Tipo</th>
                                        <th className="p-2 text-right">Peso</th>
                                        <th className="p-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {sortedTypes.map(type => (
                                        <React.Fragment key={type}>
                                            <tr className="bg-white/5 border-y border-white/10">
                                                <td colSpan="7" className="px-4 py-2 text-[10px] font-bold text-cyber-yellow tracking-[0.2em] uppercase italic">
                                                    <i className="fa-solid fa-layer-group mr-2 opacity-50"></i>
                                                    {type}
                                                </td>
                                            </tr>
                                            {groupedItems[type].map((item) => (
                                                <tr key={item.id} onClick={() => isEditMode && openEditItemModal(item)} className={`hover:bg-cyan-900/10 transition-colors ${isEditMode ? 'cursor-pointer' : ''} group border-b border-white/5 last:border-0`}>
                                                    <td className="p-2 text-center text-lg">
                                                        <i className={`fa-solid ${item.icon} ${getItemColor(item)} ${theme === 'medieval' ? 'brightness-110' : ''}`}></i>
                                                    </td>
                                                    <td className="p-2 font-medium text-white group-hover:text-white transition-colors">
                                                        <div className="flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                {item.name}
                                                                {isEditMode && <i className="fa-solid fa-pen-to-square text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i>}
                                                            </div>
                                                            {item.description && <span className="text-[10px] text-cyber-gray italic truncate max-w-[200px]">{item.description}</span>}
                                                        </div>
                                                    </td>
                                                    <td className="p-2 text-center text-cyber-gray font-mono">x{item.qty}</td>
                                                    <td className="p-2 text-center text-xs text-[#00ff99] font-mono">
                                                        {item.maxUses > 0 ? `${item.currentUses} / ${item.maxUses}` : '-'}
                                                    </td>
                                                    <td className="p-2 text-xs text-[#aaaaaa] uppercase tracking-tighter opacity-50">{item.type}</td>
                                                    <td className="p-2 text-right text-cyber-gray text-xs font-mono">{item.weight}kg</td>
                                                    <td className="p-2 text-center">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateInventoryItem(item.id, { ...item, equipped: !item.equipped });
                                                            }}
                                                            className={`w-7 h-7 flex items-center justify-center rounded transition-all ${item.equipped ? 'text-cyber-yellow bg-cyber-yellow/10 shadow-[0_0_8px_rgba(255,211,0,0.1)]' : 'text-cyber-gray hover:text-white bg-white/5'}`}
                                                            title={item.equipped ? "Desequipar" : "Equipar"}
                                                        >
                                                            <i className={`fa-solid ${item.equipped ? 'fa-shield-halved' : 'fa-shield'} text-xs`}></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="p-8 text-center text-cyber-gray/50 italic text-xs uppercase tracking-widest font-mono">Inventário Vazio</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-black/60 border-t border-white/10 mt-auto">
                            <div className="flex justify-between text-xs text-cyber-gray mb-1">
                                <span>CARGA TOTAL</span>
                                <span className={`font-mono uppercase ${totalWeight > 100 ? 'text-cyber-pink shadow-neon-pink' : 'text-white'}`}>{totalWeight.toFixed(1)} / 100 KG</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 bg-gradient-to-r from-cyber-purple to-cyber-pink shadow-[0_0_8px_#ff0099]`}
                                    style={{ width: `${Math.min(100, (totalWeight / 100) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    {/* BIOGRAFIA */}
                    <article className="glass-card rounded-xl border border-white/10 flex flex-col p-6 flex-1">
                        <h2 className="text-lg font-bold text-white tracking-wide mb-4 border-b border-white/10 pb-2 font-display uppercase italic">BIOGRAFIA & LOGS</h2>
                        {isEditMode ? (
                            <textarea
                                className="w-full h-full bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-gray-200 focus:border-cyber-pink outline-none resize-none custom-scrollbar font-sans leading-relaxed"
                                value={biography}
                                onChange={(e) => updateBiography(e.target.value)}
                                placeholder="Descreva a história e registros do personagem..."
                            />
                        ) : (
                            <div className="text-sm text-cyber-gray leading-relaxed font-sans space-y-4 overflow-y-auto custom-scrollbar pr-2 h-64 lg:h-auto">
                                <p className="first-letter:float-left first-letter:mr-2 first-letter:text-cyber-yellow first-letter:font-bold first-letter:text-4xl">
                                    {biography}
                                </p>
                            </div>
                        )}
                    </article>

                    {/* PECULIARIDADES */}
                    <article className="glass-card rounded-xl border border-white/10 flex flex-col p-6 flex-1">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                            <h2 className="text-lg font-bold text-white tracking-wide font-display uppercase italic">PECULIARIDADES</h2>
                            {isEditMode && (
                                <button
                                    onClick={openAddPecModal}
                                    className="text-cyber-gray hover:text-white transition-colors"
                                >
                                    <i className="fa-solid fa-plus text-xs border border-white/20 p-1 rounded hover:border-white transition-all"></i>
                                </button>
                            )}
                        </div>
                        <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                            <ul className="space-y-3">
                                {peculiarities.map((p) => {
                                    const meta = getPeculiaritiesMeta(p.val, p.type);
                                    return (
                                        <li
                                            key={p.id}
                                            onClick={() => isEditMode ? openEditPecModal(p) : setViewingPec(p)}
                                            className={`flex items-center justify-between group bg-white/5 p-3 rounded border border-transparent hover:border-white/10 transition-all cursor-pointer`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <i className={`fa-solid ${meta.icon} ${meta.color} text-lg`}></i>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{p.name}</span>
                                                    {isEditMode && <span className="text-[9px] text-cyber-gray uppercase tracking-tighter flex items-center gap-1"><i className="fa-solid fa-pen-to-square"></i> Editar</span>}
                                                </div>
                                            </div>
                                            <span className={`text-sm font-bold ${meta.valColor} bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono`}>{p.val}</span>
                                        </li>
                                    );
                                })}
                                {peculiarities.length === 0 && (
                                    <li className="text-center text-cyber-gray/50 italic text-[11px] uppercase tracking-widest py-4">Nenhuma peculiaridade registrada</li>
                                )}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>

            {/* MODAL DE ITEM */}
            <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} maxWidth="max-w-2xl">
                <ModalHeader onClose={() => setEditingItem(null)} className="bg-gradient-to-r from-cyber-pink/10 to-transparent">
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3 font-display uppercase">
                        <span className="text-cyber-pink">{editingItem === 'new' ? 'NOVO:' : 'EDITAR:'}</span>
                        {itemForm.name || 'ITEM'}
                    </h2>
                </ModalHeader>
                <ModalBody className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Nome do Item</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-pink outline-none transition-all"
                                type="text"
                                value={itemForm.name}
                                onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Tipo de Item</label>
                            <select
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-pink outline-none transition-all"
                                value={itemForm.type}
                                onChange={(e) => setItemForm({ ...itemForm, type: e.target.value })}
                            >
                                <option value="Arma">Arma</option>
                                <option value="Armadura">Armadura</option>
                                <option value="Escudo">Escudo</option>
                                <option value="Elmo">Elmo</option>
                                <option value="Ferramenta">Ferramenta</option>
                                <option value="Consumível">Consumível</option>
                                <option value="Item">Item</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Quantidade</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                    type="number"
                                    value={itemForm.qty}
                                    onChange={(e) => setItemForm({ ...itemForm, qty: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Peso (KG)</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                    type="number"
                                    step="0.1"
                                    value={itemForm.weight}
                                    onChange={(e) => setItemForm({ ...itemForm, weight: parseFloat(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Uso Atual</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                    type="number"
                                    min="0"
                                    max={itemForm.maxUses}
                                    value={itemForm.currentUses}
                                    onChange={(e) => setItemForm({ ...itemForm, currentUses: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Uso Total</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                    type="number"
                                    min="0"
                                    value={itemForm.maxUses}
                                    onChange={(e) => setItemForm({ ...itemForm, maxUses: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Ícone</label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsIconPickerOpen(true)}
                                    className="flex-grow flex items-center justify-between bg-black/40 border border-white/10 text-white rounded-lg px-4 py-2 hover:bg-white/5 hover:border-cyber-pink/50 transition-all group"
                                >
                                    <span className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                                            <i className={`fa-solid ${itemForm.icon || 'fa-box'} ${getItemColor(itemForm)}`}></i>
                                        </div>
                                        <span className="text-sm font-mono">{itemForm.icon || 'Selecionar Ícone...'}</span>
                                    </span>
                                    <i className="fa-solid fa-chevron-down text-xs text-gray-500 group-hover:text-white transition-colors"></i>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Preço / Valor</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                type="text"
                                value={itemForm.price}
                                onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                                placeholder="ex: 100 po"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Descrição</label>
                            <textarea
                                className="w-full h-24 bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-gray-200 focus:border-cyber-pink outline-none resize-none custom-scrollbar font-sans leading-relaxed"
                                value={itemForm.description}
                                onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })}
                                placeholder="Descreva as propriedades e efeitos deste item..."
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    <div className="flex gap-4">
                        {editingItem !== 'new' && (
                            <button
                                onClick={() => setItemToDelete(editingItem)}
                                className="flex items-center gap-2 text-cyber-pink hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest px-4"
                            >
                                <i className="fa-solid fa-trash-can"></i> EXCLUIR
                            </button>
                        )}
                        {isDevMode && (
                            <button
                                onClick={() => handleExportToCompendium(itemForm, 'item')}
                                className="text-cyber-blue hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest px-4 flex items-center gap-2 border border-cyber-blue/20 rounded"
                            >
                                <i className="fa-solid fa-code"></i> EXPORTAR
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setEditingItem(null)} className="text-cyber-gray hover:text-white uppercase text-[10px] font-bold tracking-widest px-4">CANCELAR</button>
                        <button
                            onClick={handleSaveItem}
                            className="bg-cyber-pink text-white px-8 py-2.5 rounded-lg font-bold shadow-neon-pink hover:scale-[1.02] transition-all uppercase text-[10px] tracking-widest active:scale-95"
                        >
                            SALVAR
                        </button>
                    </div>
                </ModalFooter>
            </Modal>

            {/* MODAL DE PECULIARIDADE */}
            <Modal isOpen={!!editingPec} onClose={() => setEditingPec(null)} maxWidth="max-w-xl">
                <ModalHeader onClose={() => setEditingPec(null)} className="bg-gradient-to-r from-cyber-yellow/10 to-transparent">
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3 font-display uppercase">
                        <span className="text-cyber-yellow">{editingPec === 'new' ? 'NOVA:' : 'EDITAR:'}</span>
                        {pecForm.name || 'PECULIARIDADE'}
                    </h2>
                </ModalHeader>
                <ModalBody className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Nome</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-yellow outline-none transition-all"
                                type="text"
                                value={pecForm.name}
                                onChange={(e) => setPecForm({ ...pecForm, name: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Valor / Modificador</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-yellow outline-none"
                                    type="text"
                                    value={pecForm.val}
                                    onChange={(e) => setPecForm({ ...pecForm, val: e.target.value })}
                                    placeholder="ex: +2 ou -3"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Tipo de Peculiaridade</label>
                            <select
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-yellow outline-none transition-all"
                                value={pecForm.type}
                                onChange={(e) => setPecForm({ ...pecForm, type: e.target.value })}
                            >
                                <option value="Mundana">Mundana</option>
                                <option value="Bestial">Bestial</option>
                                <option value="Extraordinária">Extraordinária</option>
                                <option value="Sobrenatural">Sobrenatural</option>
                                <option value="Mágica">Mágica</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Descrição</label>
                            <textarea
                                className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-sm text-gray-200 focus:border-cyber-yellow outline-none resize-none custom-scrollbar font-sans leading-relaxed"
                                value={pecForm.description}
                                onChange={(e) => setPecForm({ ...pecForm, description: e.target.value })}
                                placeholder="Descreva os detalhes desta peculiaridade..."
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    <div className="flex gap-4">
                        {editingPec !== 'new' && (
                            <button
                                onClick={() => setPecToDelete(editingPec)}
                                className="flex items-center gap-2 text-cyber-pink hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest px-4"
                            >
                                <i className="fa-solid fa-trash-can"></i> EXCLUIR
                            </button>
                        )}
                        {isDevMode && (
                            <button
                                onClick={() => handleExportToCompendium(pecForm, 'peculiarity')}
                                className="text-cyber-blue hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest px-4 flex items-center gap-2 border border-cyber-blue/20 rounded"
                            >
                                <i className="fa-solid fa-code"></i> EXPORTAR
                            </button>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setEditingPec(null)} className="text-cyber-gray hover:text-white uppercase text-[10px] font-bold tracking-widest px-4">CANCELAR</button>
                        <button
                            onClick={handleSavePec}
                            className="bg-cyber-yellow text-black px-8 py-2.5 rounded-lg font-bold shadow-neon-yellow hover:scale-[1.02] transition-all uppercase text-[10px] tracking-widest active:scale-95"
                        >
                            SALVAR
                        </button>
                    </div>
                </ModalFooter>
            </Modal >

            {/* MODAL DE VISUALIZAÇÃO DE PECULIARIDADE */}
            < Modal isOpen={!!viewingPec} onClose={() => setViewingPec(null)} maxWidth="max-w-xl" >
                <ModalHeader onClose={() => setViewingPec(null)} className="bg-gradient-to-r from-cyber-yellow/10 to-transparent">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg bg-black/40 flex items-center justify-center border border-cyber-yellow/20`}>
                            <i className={`fa-solid ${viewingPec ? getPeculiaritiesMeta(viewingPec.val, viewingPec.type).icon : ''} text-2xl text-cyber-yellow`}></i>
                        </div>
                        <div className="flex flex-col text-left">
                            <h2 className="text-2xl font-bold text-white tracking-tight font-display uppercase italic">
                                {viewingPec?.name}
                            </h2>
                            <span className="text-xs text-cyber-gray uppercase tracking-[0.3em] font-mono">{viewingPec?.type || 'Peculiaridade'}</span>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="p-8 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-cyber-gray font-bold">Modificador / Efeito</span>
                        <span className={`text-xl font-bold font-mono ${viewingPec ? getPeculiaritiesMeta(viewingPec.val).valColor : ''}`}>
                            {viewingPec?.val}
                        </span>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.2em] text-cyber-gray font-bold flex items-center gap-2">
                            <i className="fa-solid fa-align-left text-cyber-yellow/50"></i>
                            Descrição & Notas
                        </label>
                        <div className="bg-black/40 border border-white/5 rounded-xl p-6 text-sm text-gray-300 leading-relaxed font-sans min-h-[150px] whitespace-pre-wrap italic">
                            {viewingPec?.description || "Nenhuma descrição fornecida para esta peculiaridade."}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/40">
                    <button
                        onClick={() => setViewingPec(null)}
                        className="bg-cyber-yellow text-black px-8 py-2.5 rounded-lg font-bold shadow-neon-yellow hover:scale-[1.02] transition-all uppercase text-[10px] tracking-widest active:scale-95"
                    >
                        FECHAR
                    </button>
                </ModalFooter>
            </Modal>

            {/* SELECTOR DE ÍCONES (Nível Superior) */}
            < IconPicker
                isOpen={isIconPickerOpen}
                onClose={() => setIsIconPickerOpen(false)}
                onSelect={(iconName) => setItemForm({ ...itemForm, icon: iconName })}
                currentIcon={itemForm?.icon}
            />

            {/* CONFIRMAÇÃO DE EXCLUSÃO */}
            < ConfirmationModal
                isOpen={!!itemToDelete || !!pecToDelete}
                onClose={() => { setItemToDelete(null); setPecToDelete(null); }}
                onConfirm={itemToDelete ? confirmDeleteItem : confirmDeletePec}
                title="SISTEMA: CONFIRMAR EXCLUSÃO"
                message={`VOCÊ TEM CERTEZA QUE DESEJA ELIMINAR "${itemToDelete?.name || pecToDelete?.name}"? ESTA OPERAÇÃO É IRREVERSÍVEL NO NÚCLEO DE DADOS.`}
                confirmText="ELIMINAR"
                cancelText="ABORTAR"
            />
        </div >
    );
};

export default InventoryTab;
