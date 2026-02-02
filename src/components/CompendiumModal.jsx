import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from './Modal';
import { useCharacter } from '../context/CharacterContext';
import { useToast } from './Toast';
import { COMPENDIUM } from '../data/compendium';
import { TALENT_GROUPS } from '../data/rules';

const CompendiumModal = ({ isOpen, onClose }) => {
    const { isEditMode, addInventoryItem, addTalent, addPeculiarity, importBundle } = useCharacter();
    const { showToast } = useToast();
    const [activeCategory, setActiveCategory] = useState('items');
    const [searchTerm, setSearchTerm] = useState('');
    const [subFilter, setSubFilter] = useState('all');
    const [groupFilter, setGroupFilter] = useState('all');

    const categories = [
        { id: 'items', label: 'Itens', icon: 'fa-box-open' },
        { id: 'talents', label: 'Talentos', icon: 'fa-star' },
        { id: 'peculiarities', label: 'Peculiaridades', icon: 'fa-fingerprint' },
        { id: 'bundles', label: 'Bundles', icon: 'fa-bundle' } // Note: fa-bundle might not exist, using fa-boxes-packing instead
    ];

    const handleAddItem = (item) => {
        if (!isEditMode) {
            showToast('Habilite o Modo Edição para importar itens.', 'error');
            return;
        }
        addInventoryItem({
            ...item,
            id: Date.now().toString()
        });
        showToast(`${item.name} adicionado ao inventário!`, 'success');
    };

    const handleAddTalent = (talent) => {
        if (!isEditMode) {
            showToast('Habilite o Modo Edição para importar talentos.', 'error');
            return;
        }
        addTalent({
            ...talent,
            id: Date.now().toString()
        });
        showToast(`${talent.name} adicionado às habilidades!`, 'success');
    };

    const handleAddPeculiarity = (pec) => {
        if (!isEditMode) {
            showToast('Habilite o Modo Edição para importar peculiaridades.', 'error');
            return;
        }
        addPeculiarity({
            ...pec,
            id: Date.now().toString()
        });
        showToast(`${pec.name} adicionada às peculiaridades!`, 'success');
    };

    const handleImportBundle = (bundle) => {
        if (!isEditMode) {
            showToast('Habilite o Modo Edição para importar bundles.', 'error');
            return;
        }
        const success = importBundle(bundle);
        if (success) {
            showToast(`Bundle "${bundle.name}" importado com sucesso!`, 'success');
        } else {
            showToast('Erro ao importar bundle.', 'error');
        }
    };

    const filteredData = COMPENDIUM[activeCategory].filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

        let matchesSubFilter = subFilter === 'all' || item.type === subFilter;
        if (activeCategory === 'talents' && subFilter !== 'all') {
            const cat = subFilter === 'Ações' ? 'actions' : 'talent';
            matchesSubFilter = item.category === cat;
        }

        const matchesGroup = groupFilter === 'all' || item.group === groupFilter;

        return matchesSearch && matchesSubFilter && matchesGroup;
    });

    const getSubFilters = () => {
        if (activeCategory === 'items') {
            return ['Arma', 'Armadura', 'Escudo', 'Elmo', 'Ferramenta', 'Consumível', 'Item'];
        }
        if (activeCategory === 'peculiarities') {
            return ['Mundana', 'Bestial', 'Extraordinária', 'Sobrenatural', 'Mágica'];
        }
        if (activeCategory === 'talents') {
            return ['Ações', 'Talentos'];
        }
        return [];
    };

    const subFilters = getSubFilters();

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
            <ModalHeader onClose={onClose} className="bg-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full pr-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-cyber-blue/20 flex items-center justify-center text-cyber-blue shadow-neon-blue">
                            <i className="fa-solid fa-book-atlas"></i>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white uppercase font-display tracking-wider">Compêndio</h3>
                            <p className="text-[10px] text-cyber-gray font-mono uppercase tracking-widest">Biblioteca de Recursos</p>
                        </div>
                    </div>

                    <div className="relative flex-grow max-w-xs">
                        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-cyber-gray text-xs"></i>
                        <input
                            type="text"
                            placeholder="Buscar no compêndio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder:text-gray-600 focus:border-cyber-blue outline-none transition-all"
                        />
                    </div>
                </div>
            </ModalHeader>

            <ModalBody>
                <div className="flex flex-col gap-6">
                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/5">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setSearchTerm('');
                                    setSubFilter('all');
                                    setGroupFilter('all');
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-cyber-blue text-white shadow-neon-blue'
                                    : 'bg-white/5 text-cyber-gray hover:text-white hover:bg-white/10 border border-white/5'
                                    }`}
                            >
                                <i className={`fa-solid ${cat.id === 'bundles' ? 'fa-boxes-packing' : cat.icon}`}></i>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Sub-Filters */}
                    {subFilters.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => setSubFilter('all')}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${subFilter === 'all'
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white/5 border-white/5 text-cyber-gray hover:text-white'
                                    }`}
                            >
                                Todos
                            </button>
                            {subFilters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setSubFilter(filter)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${subFilter === filter
                                        ? 'bg-cyber-blue/20 border-cyber-blue/40 text-cyber-blue shadow-[0_0_10px_rgba(0,186,255,0.2)]'
                                        : 'bg-white/5 border-white/5 text-cyber-gray hover:text-white'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    )}
                    {/* Group Filters for Talents */}
                    {activeCategory === 'talents' && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            <button
                                onClick={() => setGroupFilter('all')}
                                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${groupFilter === 'all'
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white/5 border-white/5 text-cyber-gray hover:text-white'
                                    }`}
                            >
                                Todos os Grupos
                            </button>
                            {TALENT_GROUPS.map(group => (
                                <button
                                    key={group}
                                    onClick={() => setGroupFilter(group)}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${groupFilter === group
                                        ? 'bg-cyber-purple/20 border-cyber-purple/40 text-cyber-purple shadow-[0_0_10px_rgba(189,0,255,0.2)]'
                                        : 'bg-white/5 border-white/5 text-cyber-gray hover:text-white'
                                        }`}
                                >
                                    {group}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Content List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, idx) => (
                                <div key={idx} className="glass-card border border-white/10 p-4 hover:border-cyber-blue/50 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyber-blue opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex items-start gap-3">
                                            {item.icon && (
                                                <div className={`w-10 h-10 rounded bg-white/5 flex items-center justify-center ${item.color || 'text-white'} border border-white/10 shrink-0`}>
                                                    <i className={`fa-solid ${item.icon}`}></i>
                                                </div>
                                            )}
                                            <div>
                                                <h4 className="text-sm font-bold text-white uppercase tracking-tight">{item.name}</h4>
                                                {item.type && (
                                                    <span className="text-[10px] text-cyber-gray uppercase font-mono">{item.type} {item.price ? `• ${item.price}` : ''}</span>
                                                )}
                                                {item.description && (
                                                    <p className="text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed italic border-l border-white/10 pl-2">
                                                        {item.description}
                                                    </p>
                                                )}
                                                {activeCategory === 'bundles' && (
                                                    <div className="mt-2 flex flex-wrap gap-1">
                                                        {item.items?.length > 0 && <span className="text-[9px] bg-cyber-pink/20 text-cyber-pink px-1.5 py-0.5 rounded border border-cyber-pink/30 uppercase">{item.items.length} Itens</span>}
                                                        {item.talents?.length > 0 && <span className="text-[9px] bg-cyber-purple/20 text-cyber-purple px-1.5 py-0.5 rounded border border-cyber-purple/30 uppercase">{item.talents.length} Talentos</span>}
                                                        {item.peculiarities?.length > 0 && <span className="text-[9px] bg-cyber-yellow/20 text-cyber-yellow px-1.5 py-0.5 rounded border border-cyber-yellow/30 uppercase">{item.peculiarities.length} Peculiaridades</span>}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                if (activeCategory === 'items') handleAddItem(item);
                                                else if (activeCategory === 'talents') handleAddTalent(item);
                                                else if (activeCategory === 'peculiarities') handleAddPeculiarity(item);
                                                else if (activeCategory === 'bundles') handleImportBundle(item);
                                            }}
                                            className="px-3 py-1.5 rounded bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue hover:text-black text-[10px] font-bold uppercase transition-all whitespace-nowrap"
                                        >
                                            <i className="fa-solid fa-plus mr-1"></i>
                                            {activeCategory === 'bundles' ? 'Importar' : 'Adicionar'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center flex flex-col items-center gap-4 border border-dashed border-white/10 rounded-xl">
                                <i className="fa-solid fa-magnifying-glass text-4xl text-white/5"></i>
                                <span className="text-cyber-gray text-xs uppercase tracking-widest">Nenhum resultado encontrado</span>
                            </div>
                        )}
                    </div>

                    {!isEditMode && (
                        <div className="bg-cyber-yellow/10 border border-cyber-yellow/30 p-3 rounded-lg flex items-center gap-3">
                            <i className="fa-solid fa-triangle-exclamation text-cyber-yellow animate-pulse"></i>
                            <p className="text-[10px] text-cyber-yellow uppercase font-bold tracking-wider">
                                Ative o Modo Edição no cabeçalho para poder importar recursos do compêndio.
                            </p>
                        </div>
                    )}
                </div>
            </ModalBody>
        </Modal>
    );
};

export default CompendiumModal;
