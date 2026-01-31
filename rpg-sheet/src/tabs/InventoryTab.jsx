import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal } from '../components/Modal';
import { useCharacter } from '../context/CharacterContext';
import { useToast } from '../components/Toast';

const InventoryTab = () => {
    const {
        characterData, isEditMode,
        addInventoryItem, updateInventoryItem, deleteInventoryItem,
        addPeculiarity, updatePeculiarity, deletePeculiarity,
        updateBiography, updateCurrency
    } = useCharacter();
    const { showToast } = useToast();

    // Inventory State
    const [editingItem, setEditingItem] = useState(null);
    const [itemForm, setItemForm] = useState({ name: '', icon: 'fa-box', color: 'text-gray-300', qty: 1, uses: '-', type: 'Item', price: '', weight: 0 });
    const [itemToDelete, setItemToDelete] = useState(null);

    // Peculiarities State
    const [editingPec, setEditingPec] = useState(null);
    const [pecForm, setPecForm] = useState({ name: '', icon: 'fa-star', color: 'text-cyber-yellow', val: '+0', valColor: 'text-[#00ff99]' });
    const [pecToDelete, setPecToDelete] = useState(null);

    const items = characterData.inventory || [];
    const peculiarities = characterData.peculiarities || [];
    const currency = characterData.currency || { po: 0, pp: 0, pc: 0 };
    const biography = characterData.biography || "";

    // Item Handlers
    const openAddItemModal = () => {
        setEditingItem(null);
        setItemForm({ name: '', icon: 'fa-box', color: 'text-gray-300', qty: 1, uses: '-', type: 'Item', price: '', weight: 0 });
        setEditingItem('new');
    };

    const openEditItemModal = (item) => {
        setEditingItem(item);
        setItemForm(item);
    };

    const handleSaveItem = () => {
        if (editingItem === 'new') {
            addInventoryItem(itemForm);
            showToast(`ITEM "${itemForm.name}" ADICIONADO`, 'success');
        } else {
            updateInventoryItem(editingItem.id, itemForm);
            showToast(`ITEM "${itemForm.name}" ATUALIZADO`, 'success');
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
        setPecForm({ name: '', icon: 'fa-star', color: 'text-cyber-yellow', val: '+0', valColor: 'text-[#00ff99]' });
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

    const totalWeight = items.reduce((acc, item) => acc + (parseFloat(item.weight) * parseInt(item.qty) || 0), 0);

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
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-white/5">
                                    {items.map((item) => (
                                        <tr key={item.id} onClick={() => isEditMode && openEditItemModal(item)} className={`hover:bg-white/5 transition-colors ${isEditMode ? 'cursor-pointer' : ''} group`}>
                                            <td className="p-2 text-center text-lg">
                                                <i className={`fa-solid ${item.icon} ${item.color}`}></i>
                                            </td>
                                            <td className="p-2 font-medium text-white group-hover:text-cyber-pink transition-colors">
                                                <div className="flex items-center gap-2">
                                                    {item.name}
                                                    {isEditMode && <i className="fa-solid fa-pen-to-square text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"></i>}
                                                </div>
                                            </td>
                                            <td className="p-2 text-center text-cyber-gray font-mono">x{item.qty}</td>
                                            <td className="p-2 text-center text-xs text-[#00ff99] font-mono">{item.uses}</td>
                                            <td className="p-2 text-xs text-[#aaaaaa] uppercase tracking-tighter">{item.type}</td>
                                            <td className="p-2 text-right text-cyber-gray text-xs font-mono">{item.weight}kg</td>
                                        </tr>
                                    ))}
                                    {items.length === 0 && (
                                        <tr>
                                            <td colSpan="6" className="p-8 text-center text-cyber-gray/50 italic text-xs uppercase tracking-widest">Inventário Vazio</td>
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
                                {peculiarities.map((p) => (
                                    <li
                                        key={p.id}
                                        onClick={() => isEditMode && openEditPecModal(p)}
                                        className={`flex items-center justify-between group bg-white/5 p-3 rounded border border-transparent hover:border-white/10 transition-all ${isEditMode ? 'cursor-pointer' : ''}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`fa-solid ${p.icon} ${p.color} text-lg`}></i>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{p.name}</span>
                                                {isEditMode && <span className="text-[9px] text-cyber-gray uppercase tracking-tighter flex items-center gap-1"><i className="fa-solid fa-pen-to-square"></i> Editar</span>}
                                            </div>
                                        </div>
                                        <span className={`text-sm font-bold ${p.valColor} bg-white/5 px-2 py-0.5 rounded border border-white/10 font-mono`}>{p.val}</span>
                                    </li>
                                ))}
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
                                <option value="Item">Geral</option>
                                <option value="Consumível">Consumível</option>
                                <option value="Arma">Arma</option>
                                <option value="Ferramenta">Ferramenta</option>
                                <option value="Quest">Missão</option>
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
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Usos / Cargas</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                type="text"
                                value={itemForm.uses}
                                onChange={(e) => setItemForm({ ...itemForm, uses: e.target.value })}
                                placeholder="ex: 3/3 ou -"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Ícone (FA)</label>
                            <input
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-pink outline-none"
                                type="text"
                                value={itemForm.icon}
                                onChange={(e) => setItemForm({ ...itemForm, icon: e.target.value })}
                                placeholder="fa-box"
                            />
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
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    {editingItem !== 'new' ? (
                        <button
                            onClick={() => setItemToDelete(editingItem)}
                            className="flex items-center gap-2 text-cyber-pink hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest px-4"
                        >
                            <i className="fa-solid fa-trash-can"></i> EXCLUIR
                        </button>
                    ) : <div></div>}
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
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Valor / Modificador</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-yellow outline-none"
                                    type="text"
                                    value={pecForm.val}
                                    onChange={(e) => setPecForm({ ...pecForm, val: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Cor do Modificador</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-yellow outline-none"
                                    value={pecForm.valColor}
                                    onChange={(e) => setPecForm({ ...pecForm, valColor: e.target.value })}
                                >
                                    <option value="text-[#00ff99]">Verde (Bônus)</option>
                                    <option value="text-red-400">Vermelho (Penalidade)</option>
                                    <option value="text-cyber-gray">Cinza (Neutro)</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Ícone (FA)</label>
                                <input
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white font-mono focus:ring-1 focus:ring-cyber-yellow outline-none"
                                    type="text"
                                    value={pecForm.icon}
                                    onChange={(e) => setPecForm({ ...pecForm, icon: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Cor Sugerida</label>
                                <select
                                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-yellow outline-none"
                                    value={pecForm.color}
                                    onChange={(e) => setPecForm({ ...pecForm, color: e.target.value })}
                                >
                                    <option value="text-cyber-yellow">Amarelo</option>
                                    <option value="text-cyber-pink">Rosa</option>
                                    <option value="text-cyber-purple">Roxo</option>
                                    <option value="text-cyber-cyan">Ciano</option>
                                    <option value="text-white">Branco</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    {editingPec !== 'new' ? (
                        <button
                            onClick={() => setPecToDelete(editingPec)}
                            className="flex items-center gap-2 text-cyber-pink hover:text-white transition-all font-bold uppercase text-[10px] tracking-widest px-4"
                        >
                            <i className="fa-solid fa-trash-can"></i> EXCLUIR
                        </button>
                    ) : <div></div>}
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
            </Modal>

            {/* CONFIRMAÇÃO DE EXCLUSÃO */}
            <ConfirmationModal
                isOpen={!!itemToDelete || !!pecToDelete}
                onClose={() => { setItemToDelete(null); setPecToDelete(null); }}
                onConfirm={itemToDelete ? confirmDeleteItem : confirmDeletePec}
                title="SISTEMA: CONFIRMAR EXCLUSÃO"
                message={`VOCÊ TEM CERTEZA QUE DESEJA ELIMINAR "${itemToDelete?.name || pecToDelete?.name}"? ESTA OPERAÇÃO É IRREVERSÍVEL NO NÚCLEO DE DADOS.`}
                confirmText="ELIMINAR"
                cancelText="ABORTAR"
            />
        </div>
    );
};

export default InventoryTab;
