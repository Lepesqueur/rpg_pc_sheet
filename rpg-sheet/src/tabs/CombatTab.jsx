import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ConfirmationModal } from '../components/Modal';
import { useCharacter } from '../context/CharacterContext';
import { DAMAGE_RESISTANCES } from '../data/rules';

// Componente simples de progresso circular usando SVG
const CircularProgress = ({ value, max, color, label, sublabel, shadowColor, statusKey, isEditMode }) => {
    const { characterData, updateStatusMax, updateStatus, updateConditionLevel } = useCharacter();
    const statusLevel = characterData[statusKey].level || 0;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;
    const offset = circumference - progress;

    return (
        <div className="flex flex-col items-center gap-2 w-full shrink-0">
            <div className="relative w-[90px] h-[90px] flex items-center justify-center">
                {/* Botão de Diminuir (Esq) */}
                <button
                    onClick={() => updateStatus(statusKey, -1)}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all z-10"
                >
                    <i className="fa-solid fa-minus text-[8px]"></i>
                </button>

                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="45" cy="45" r={radius} stroke="#2d2d3d" strokeWidth="6" fill="transparent" />
                    <circle
                        cx="45"
                        cy="45"
                        r={radius}
                        stroke={color}
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                        style={{ filter: `drop-shadow(0 0 3px ${shadowColor || color})` }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex items-baseline justify-center">
                        <span className="text-lg font-bold text-white leading-none">{value}</span>
                        <span className="text-[10px] text-cyber-gray mx-0.5">/</span>
                        {isEditMode ? (
                            <input
                                type="number"
                                value={max}
                                onChange={(e) => updateStatusMax(statusKey, e.target.value)}
                                className="w-8 bg-black/40 border-b border-cyber-yellow/50 text-[11px] font-bold text-cyber-yellow text-center outline-none focus:border-cyber-yellow transition-all"
                            />
                        ) : (
                            <span className="text-[10px] text-cyber-gray font-bold">{max}</span>
                        )}
                    </div>
                    <span className="text-[9px] uppercase font-bold tracking-widest mt-1" style={{ color }}>{label}</span>
                </div>

                {/* Botão de Aumentar (Dir) */}
                <button
                    onClick={() => updateStatus(statusKey, 1)}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all z-10"
                >
                    <i className="fa-solid fa-plus text-[8px]"></i>
                </button>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color }}>{sublabel}</span>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => {
                        const isActive = statusLevel >= i;
                        return (
                            <div
                                key={i}
                                onClick={() => updateConditionLevel(statusKey, i)}
                                className={`w-4 h-4 border rounded-sm cursor-pointer transition-all hover:scale-110 ${isActive ? 'bg-current shadow-[0_0_8px_currentColor]' : 'bg-transparent overflow-hidden opacity-30 hover:opacity-100'}`}
                                style={{ borderColor: color, color: color }}
                            ></div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CombatTab = () => {
    const {
        characterData, isEditMode, updateDefense,
        addAttack, updateAttack, deleteAttack, updateAttackWear,
        addArmor, updateArmor, deleteArmor, updateArmorCurrent,
        updateResistance
    } = useCharacter();
    const [activeModal, setActiveModal] = useState(null);
    const [selectedAttack, setSelectedAttack] = useState(null);
    const [attackForm, setAttackForm] = useState({ name: '', ap: 0, resource: { type: 'vitality', value: 0 }, damage: '', range: '', skill: 'Luta', properties: '' });
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [attackToDelete, setAttackToDelete] = useState(null);

    const [armorForm, setArmorForm] = useState({ name: '', max: 0, current: 0, notes: '', icon: 'fa-shield-halved', reflexBonus: 0, properties: '' });
    const [selectedArmor, setSelectedArmor] = useState(null);
    const [isArmorDeleteModalOpen, setIsArmorDeleteModalOpen] = useState(false);
    const [armorToDelete, setArmorToDelete] = useState(null);

    const openEditModal = (attack) => {
        setSelectedAttack(attack);
        setAttackForm(attack);
        setActiveModal('weapon');
    };

    const openAddModal = () => {
        setSelectedAttack(null);
        setAttackForm({ name: '', ap: 0, resource: { type: 'vitality', value: 0 }, damage: '', range: '', skill: 'Luta', properties: '' });
        setActiveModal('weapon');
    };

    const handleSaveAttack = () => {
        if (selectedAttack) {
            updateAttack(selectedAttack.id, attackForm);
        } else {
            addAttack(attackForm);
        }
        setActiveModal(null);
    };

    const handleDeleteAttack = () => {
        if (selectedAttack) {
            setAttackToDelete(selectedAttack);
            setIsDeleteModalOpen(true);
        }
    };

    const confirmDeleteAttack = () => {
        if (attackToDelete) {
            deleteAttack(attackToDelete.id);
            setIsDeleteModalOpen(false);
            setAttackToDelete(null);
            if (activeModal === 'weapon') setActiveModal(null);
        }
    };

    const openArmorEditModal = (armor) => {
        setSelectedArmor(armor);
        setArmorForm(armor);
        setActiveModal('armor');
    };

    const openArmorAddModal = () => {
        setSelectedArmor(null);
        setArmorForm({ name: '', max: 0, current: 0, notes: '', icon: 'fa-shield-halved', reflexBonus: 0, properties: '' });
        setActiveModal('armor');
    };

    const handleSaveArmor = () => {
        if (selectedArmor) {
            updateArmor(selectedArmor.id, armorForm);
        } else {
            addArmor(armorForm);
        }
        setActiveModal(null);
    };

    const handleDeleteArmor = () => {
        if (selectedArmor) {
            setArmorToDelete(selectedArmor);
            setIsArmorDeleteModalOpen(true);
        }
    };

    const confirmDeleteArmor = () => {
        if (armorToDelete) {
            deleteArmor(armorToDelete.id);
            setIsArmorDeleteModalOpen(false);
            setArmorToDelete(null);
            if (activeModal === 'armor') setActiveModal(null);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">

                {/* 1. ATAQUES & 2. ARMADURAS */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-3 border-l-4 border-cyber-pink font-display">Ataques</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-[10px] text-cyber-gray uppercase tracking-wider border-b border-white/5">
                                    <tr>
                                        <th className="pb-2 font-semibold">Arma</th>
                                        <th className="pb-2 font-semibold text-center">AP</th>
                                        <th className="pb-2 font-semibold text-center">Recurso</th>
                                        <th className="pb-2 font-semibold text-center">Dano</th>
                                        <th className="pb-2 font-semibold text-center">Alcance</th>
                                        <th className="pb-2 font-semibold text-center">Desgaste</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {characterData.attacks.map((attack) => (
                                        <tr key={attack.id} onClick={() => openEditModal(attack)} className="group hover:bg-white/5 transition-colors cursor-pointer text-[13px]">
                                            <td className="py-3 font-bold text-white group-hover:text-cyber-pink transition-colors">
                                                <div className="flex items-center gap-2">
                                                    {isEditMode && (
                                                        <div className="flex gap-2 mr-1">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); openEditModal(attack); }}
                                                                className="text-cyber-pink hover:text-white transition-colors p-1"
                                                            >
                                                                <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                                                            </button>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setAttackToDelete(attack);
                                                                    setIsDeleteModalOpen(true);
                                                                }}
                                                                className="text-cyber-red hover:text-white transition-colors p-1"
                                                            >
                                                                <i className="fa-solid fa-trash text-[10px]"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                    {attack.name}
                                                </div>
                                            </td>
                                            <td className="py-3 text-center text-cyber-yellow font-mono font-bold">{attack.ap}</td>
                                            <td className="py-3 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <i className={`fa-solid ${attack.resource.type === 'focus' ? 'fa-bolt-lightning text-cyber-purple' : 'fa-heart text-cyber-pink'} text-[8px] font-bold`}></i>
                                                    <span className="text-white font-mono font-bold">{attack.resource.value}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-center text-white font-mono font-bold">{attack.damage}</td>
                                            <td className="py-3 text-center text-gray-400 font-mono">{attack.range}</td>
                                            <td className="py-3 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {[1, 2].map(level => (
                                                        <div
                                                            key={level}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                updateAttackWear(attack.id, level);
                                                            }}
                                                            className={`w-3 h-3 border rounded-sm transition-all hover:scale-110 cursor-pointer ${(attack.wear || 0) >= level
                                                                ? 'bg-cyber-yellow border-cyber-yellow shadow-[0_0_8px_rgba(255,215,0,0.5)]'
                                                                : 'bg-transparent border-white/20 hover:border-cyber-yellow/50'
                                                                }`}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {isEditMode && (
                                        <tr onClick={openAddModal} className="group hover:bg-cyber-pink/5 transition-colors cursor-pointer text-[13px] border-t border-dashed border-white/10">
                                            <td colSpan="6" className="py-4 text-center text-cyber-pink font-bold uppercase tracking-widest text-[10px]">
                                                <i className="fa-solid fa-plus mr-2"></i> Adicionar Novo Ataque
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-3 border-l-4 border-cyber-yellow font-display">Armaduras</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-[10px] text-cyber-gray uppercase tracking-wider border-b border-white/5">
                                    <tr>
                                        <th className="pb-2 font-semibold">Nome da Armadura</th>
                                        <th className="pb-2 font-semibold text-center w-20">MÁX</th>
                                        <th className="pb-2 font-semibold text-center w-24">ATUAL</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {(characterData.armors || []).map((armor) => (
                                        <tr key={armor.id} onClick={() => openArmorEditModal(armor)} className="group hover:bg-white/5 transition-colors cursor-pointer text-[13px]">
                                            <td className="py-3 flex items-center gap-3">
                                                <div className="flex gap-2 items-center">
                                                    {isEditMode && (
                                                        <div className="flex gap-1">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); openArmorEditModal(armor); }}
                                                                className="text-cyber-yellow hover:text-white transition-colors p-1"
                                                            >
                                                                <i className="fa-solid fa-pen-to-square text-[10px]"></i>
                                                            </button>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setArmorToDelete(armor); setIsArmorDeleteModalOpen(true); }}
                                                                className="text-cyber-red hover:text-white transition-colors p-1"
                                                            >
                                                                <i className="fa-solid fa-trash text-[10px]"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                    <i className={`fa-solid ${armor.icon || 'fa-shield-halved'} text-cyber-yellow text-xs`}></i>
                                                    <span className="font-bold text-white group-hover:text-cyber-yellow transition-colors">{armor.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-center text-cyber-yellow font-bold text-lg font-mono">{armor.max}</td>
                                            <td className="py-3 text-center">
                                                <div className="flex items-center justify-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                                    {Array.from({ length: Math.min(5, armor.max || 0) }).map((_, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => updateArmorCurrent(armor.id, armor.current === i + 1 ? i : i + 1)}
                                                            className={`w-3.5 h-3.5 border rounded-sm transition-all hover:scale-110 cursor-pointer ${(armor.current || 0) > i
                                                                ? 'bg-cyber-yellow border-cyber-yellow shadow-[0_0_8px_rgba(255,215,0,0.5)]'
                                                                : 'bg-transparent border-white/20 hover:border-cyber-yellow/50'
                                                                }`}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {isEditMode && (
                                        <tr onClick={openArmorAddModal} className="group hover:bg-cyber-yellow/5 transition-colors cursor-pointer text-[13px] border-t border-dashed border-white/10">
                                            <td colSpan="3" className="py-4 text-center text-cyber-yellow font-bold uppercase tracking-widest text-[10px]">
                                                <i className="fa-solid fa-plus mr-2"></i> Adicionar Nova Armadura
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 3. DEFESAS PRIMÁRIAS & 4. RESISTÊNCIAS ESPECIAIS */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-3 border-l-4 border-cyber-purple font-display">Salvaguardas</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { key: 'fortitude', icon: 'fa-shield-halved', color: 'cyber-purple', label: 'Fortitude' },
                                { key: 'reflex', icon: 'fa-bolt-lightning', color: 'cyber-pink', label: 'Reflexo' },
                                { key: 'tenacity', icon: 'fa-hand-fist', color: 'cyber-yellow', label: 'Tenacidade' }
                            ].map((def) => (
                                <div key={def.key} className={`bg-black/40 p-3 rounded-lg flex flex-col items-center border-b-2 border-${def.color}/50 group hover:bg-${def.color}/5 transition-all`}>
                                    <i className={`fa-solid ${def.icon} text-xl text-${def.color} mb-1 group-hover:scale-110 transition-transform`}></i>
                                    <span className="text-[9px] text-cyber-gray uppercase tracking-widest font-bold">{def.label}</span>
                                    {isEditMode ? (
                                        <input
                                            type="number"
                                            value={characterData.defenses[def.key]}
                                            onChange={(e) => updateDefense(def.key, e.target.value)}
                                            className="w-full bg-transparent text-center text-2xl font-bold text-white border-b border-cyber-yellow/30 focus:border-cyber-yellow outline-none"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-white">{characterData.defenses[def.key]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase pl-3 border-l-4 border-cyber-yellow font-display">Resistência a dano</h3>
                            <button onClick={() => setActiveModal('resistances')} className="text-cyber-gray hover:text-white transition-colors"><i className="fa-solid fa-pen-to-square text-xs"></i></button>
                        </div>
                        <div className="space-y-4">
                            {/* Resistências (Valor > 0 e não vulnerável) */}
                            {Object.entries(characterData.resistances || {}).some(([key, res]) => res.value > 0 && !res.vulnerable && !res.immunity) && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-cyber-green text-[16px]">verified_user</span>
                                        <span className="text-[10px] font-bold text-cyber-green uppercase tracking-tighter">Resistências</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(DAMAGE_RESISTANCES).flatMap(([catKey, cat]) =>
                                            cat.types.map(type => {
                                                const res = characterData.resistances[type.key];
                                                if (res && res.value > 0 && !res.vulnerable && !res.immunity) {
                                                    return (
                                                        <span key={type.key} className="bg-cyber-green/10 border border-cyber-green/30 text-cyber-green px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1">
                                                            <i className={`fa-solid ${type.icon} text-[9px]`}></i> {type.name} ({res.value})
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Imunidades */}
                            {Object.entries(characterData.resistances || {}).some(([key, res]) => res.immunity) && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-cyber-cyan text-[16px]">security</span>
                                        <span className="text-[10px] font-bold text-cyber-cyan uppercase tracking-tighter">Imunidades</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(DAMAGE_RESISTANCES).flatMap(([catKey, cat]) =>
                                            cat.types.map(type => {
                                                const res = characterData.resistances[type.key];
                                                if (res && res.immunity) {
                                                    return (
                                                        <span key={type.key} className="bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1">
                                                            <i className={`fa-solid ${type.icon} text-[9px]`}></i> {type.name}
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Vulnerabilidades */}
                            {Object.entries(characterData.resistances || {}).some(([key, res]) => res.vulnerable || (res.value > 0 && res.vulnerable)) && (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-cyber-red text-[16px]">warning</span>
                                        <span className="text-[10px] font-bold text-cyber-red uppercase tracking-tighter">Vulnerabilidades</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(DAMAGE_RESISTANCES).flatMap(([catKey, cat]) =>
                                            cat.types.map(type => {
                                                const res = characterData.resistances[type.key];
                                                if (res && (res.vulnerable)) {
                                                    return (
                                                        <span key={type.key} className="bg-cyber-red/10 border border-cyber-red/30 text-cyber-red px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1">
                                                            <i className={`fa-solid ${type.icon} text-[9px]`}></i> {type.name}{res.value > 0 ? ` (${res.value})` : ''}
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 5. STATUS E CONDIÇÕES */}
                <div className="lg:col-span-3 border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                    <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-6 pl-3 border-l-4 border-cyber-yellow font-display">Status e Condições</h3>
                    <div className="flex flex-col gap-6 items-center mb-6">
                        <CircularProgress
                            value={characterData.vitality.current}
                            max={characterData.vitality.max}
                            color="#ff0099"
                            label="Vitalidade"
                            sublabel="Ferida"
                            statusKey="vitality"
                            isEditMode={isEditMode}
                        />
                        <CircularProgress
                            value={characterData.focus.current}
                            max={characterData.focus.max}
                            color="#bd00ff"
                            label="Foco"
                            sublabel="Fadiga"
                            statusKey="focus"
                            isEditMode={isEditMode}
                        />
                        <CircularProgress
                            value={characterData.will.current}
                            max={characterData.will.max}
                            color="#ffd700"
                            label="Vontade"
                            sublabel="Trauma"
                            statusKey="will"
                            isEditMode={isEditMode}
                        />
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-cyber-gray text-[10px] font-bold tracking-[0.2em] uppercase pl-3 border-l-4 border-cyber-pink font-display">Condições Ativas</h4>
                            <button onClick={() => setActiveModal('conditions')} className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyber-pink/20 hover:border-cyber-pink/50 transition-all text-gray-400 hover:text-cyber-pink">
                                <i className="fa-solid fa-plus text-[9px]"></i>
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 p-2 rounded-lg bg-black/20 border border-white/5 min-h-[50px]">
                            <span className="px-2 py-1 bg-cyber-pink/10 border border-cyber-pink/30 text-cyber-pink rounded text-[10px] font-bold uppercase flex items-center gap-1 shadow-[0_0_5px_rgba(255,0,153,0.3)]">
                                <i className="fa-solid fa-ghost"></i> Amedrontado
                            </span>
                            <span className="px-2 py-1 bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple rounded text-[10px] font-bold uppercase flex items-center gap-1 shadow-[0_0_5px_rgba(189,0,255,0.3)]">
                                <i className="fa-solid fa-brain"></i> Confuso
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={activeModal === 'weapon'} onClose={() => setActiveModal(null)} maxWidth="max-w-2xl">
                <ModalHeader onClose={() => setActiveModal(null)} className="bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-cyber-pink/20 border border-cyber-pink/50 flex items-center justify-center shadow-neon-pink text-cyber-pink-shadow"><i className="fa-solid fa-sword text-cyber-pink text-xl text-glow-pink"></i></div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-display">{selectedAttack ? 'Editar Ataque' : 'Novo Ataque'}</h2>
                            <p className="text-cyber-gray text-xs font-semibold tracking-widest uppercase font-mono">{attackForm.name || 'Nova Arma'}</p>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Nome da Arma</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-pink transition-all"
                                type="text"
                                value={attackForm.name}
                                onChange={(e) => setAttackForm({ ...attackForm, name: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Ação Pública (AP)</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white font-mono outline-none focus:border-cyber-pink transition-all"
                                type="number"
                                value={attackForm.ap}
                                onChange={(e) => setAttackForm({ ...attackForm, ap: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Recurso (Tipo)</label>
                            <select
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-pink transition-all"
                                value={attackForm.resource.type}
                                onChange={(e) => setAttackForm({ ...attackForm, resource: { ...attackForm.resource, type: e.target.value } })}
                            >
                                <option value="vitality">Vitalidade</option>
                                <option value="focus">Foco</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Custo de Recurso</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white font-mono outline-none focus:border-cyber-pink transition-all"
                                type="number"
                                value={attackForm.resource.value}
                                onChange={(e) => setAttackForm({ ...attackForm, resource: { ...attackForm.resource, value: parseInt(e.target.value) || 0 } })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Dano</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white font-mono outline-none focus:border-cyber-pink transition-all"
                                type="text"
                                value={attackForm.damage}
                                onChange={(e) => setAttackForm({ ...attackForm, damage: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Alcance</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white font-mono outline-none focus:border-cyber-pink transition-all"
                                type="text"
                                value={attackForm.range}
                                onChange={(e) => setAttackForm({ ...attackForm, range: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Perícia Associada</label>
                            <select
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-pink transition-all"
                                value={attackForm.skill}
                                onChange={(e) => setAttackForm({ ...attackForm, skill: e.target.value })}
                            >
                                {Object.values(characterData.skillCategories).flatMap(cat => cat.skills).map(skill => (
                                    <option key={skill.name} value={skill.name}>{skill.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Propriedades</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-pink transition-all"
                                type="text"
                                placeholder="Ex: Leve, Versátil, Perigosa..."
                                value={attackForm.properties}
                                onChange={(e) => setAttackForm({ ...attackForm, properties: e.target.value })}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    {selectedAttack ? (
                        <button onClick={handleDeleteAttack} className="px-6 py-2.5 rounded-lg border border-cyber-red/50 text-cyber-red font-bold uppercase text-xs hover:bg-cyber-red/10 transition-all">Excluir</button>
                    ) : (
                        <div></div>
                    )}
                    <button onClick={handleSaveAttack} className="px-8 py-2.5 rounded-lg bg-cyber-pink text-white font-extrabold uppercase text-xs shadow-neon-pink hover:scale-105 transition-all">Salvar</button>
                </ModalFooter>
            </Modal>

            {/* Other modals (Resistances, Armor, Conditions) following the same logic */}
            {/* Modal de Armadura */}
            <Modal isOpen={activeModal === 'armor'} onClose={() => setActiveModal(null)} maxWidth="max-w-2xl">
                <ModalHeader onClose={() => setActiveModal(null)} className="bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-cyber-yellow/20 border border-cyber-yellow/50 flex items-center justify-center shadow-neon-yellow text-cyber-yellow-shadow"><i className="fa-solid fa-shield-halved text-cyber-yellow text-xl text-glow-yellow"></i></div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-display">{selectedArmor ? 'Editar Armadura' : 'Nova Armadura'}</h2>
                            <p className="text-cyber-gray text-xs font-semibold tracking-widest uppercase font-mono">{armorForm.name || 'Nova Armadura'}</p>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Nome da Armadura</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-yellow transition-all"
                                type="text"
                                value={armorForm.name}
                                onChange={(e) => setArmorForm({ ...armorForm, name: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Valor de Proteção (MAX)</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white font-mono outline-none focus:border-cyber-yellow transition-all"
                                type="number"
                                value={armorForm.max}
                                onChange={(e) => setArmorForm({ ...armorForm, max: parseInt(e.target.value) || 0, current: selectedArmor ? armorForm.current : parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Ícone (FontAwesome class)</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-yellow transition-all font-mono text-sm"
                                type="text"
                                value={armorForm.icon}
                                onChange={(e) => setArmorForm({ ...armorForm, icon: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Bônus de Reflexo</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white font-mono outline-none focus:border-cyber-yellow transition-all"
                                type="number"
                                value={armorForm.reflexBonus}
                                onChange={(e) => setArmorForm({ ...armorForm, reflexBonus: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Propriedades</label>
                            <input
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white outline-none focus:border-cyber-yellow transition-all"
                                type="text"
                                placeholder="Ex: Pesada, Selada, Energizada..."
                                value={armorForm.properties}
                                onChange={(e) => setArmorForm({ ...armorForm, properties: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1 tracking-widest">Notas/Observações</label>
                            <textarea
                                className="bg-black/40 border border-white/10 rounded-lg py-2 px-4 text-white min-h-[80px] outline-none focus:border-cyber-yellow transition-all resize-none"
                                value={armorForm.notes}
                                onChange={(e) => setArmorForm({ ...armorForm, notes: e.target.value })}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    {selectedArmor ? (
                        <button onClick={handleDeleteArmor} className="px-6 py-2.5 rounded-lg border border-cyber-red/50 text-cyber-red font-bold uppercase text-xs hover:bg-cyber-red/10 transition-all">Excluir</button>
                    ) : (
                        <div></div>
                    )}
                    <button onClick={handleSaveArmor} className="px-8 py-2.5 rounded-lg bg-cyber-yellow text-black font-extrabold uppercase text-xs shadow-neon-yellow hover:scale-105 transition-all">Salvar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={activeModal === 'resistances'} onClose={() => setActiveModal(null)} maxWidth="max-w-4xl">
                <ModalHeader onClose={() => setActiveModal(null)} className="bg-black/40 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white text-glow-purple">Editar Resistências</h2>
                        <p className="text-xs text-cyber-gray mt-1 uppercase tracking-tighter">Ajuste valores, imunidades e vulnerabilidades</p>
                    </div>
                </ModalHeader>
                <ModalBody className="p-6 overflow-y-auto space-y-8 max-h-[70vh]">
                    {Object.entries(DAMAGE_RESISTANCES).map(([catKey, category]) => (
                        <section key={catKey}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`h-px flex-grow bg-gradient-to-r ${catKey === 'mundane' ? 'from-cyber-pink' : catKey === 'elemental' ? 'from-cyber-purple' : catKey === 'intangible' ? 'from-cyber-yellow' : 'from-cyber-cyan'} to-transparent opacity-30`}></div>
                                <h3 className={`font-bold uppercase tracking-widest text-sm flex items-center gap-2 ${catKey === 'mundane' ? 'text-cyber-pink' : catKey === 'elemental' ? 'text-cyber-purple' : catKey === 'intangible' ? 'text-cyber-yellow' : 'text-cyber-cyan'}`}>
                                    <i className={`fa-solid ${category.icon}`}></i> {category.label}
                                </h3>
                                <div className={`h-px flex-grow bg-gradient-to-l ${catKey === 'mundane' ? 'from-cyber-pink' : catKey === 'elemental' ? 'from-cyber-purple' : catKey === 'intangible' ? 'from-cyber-yellow' : 'from-cyber-cyan'} to-transparent opacity-30`}></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {category.types.map(type => {
                                    const res = characterData.resistances[type.key] || { value: 0, immunity: false, vulnerable: false };
                                    const catColor = catKey === 'mundane' ? 'cyber-pink' : catKey === 'elemental' ? 'cyber-purple' : catKey === 'intangible' ? 'cyber-yellow' : 'cyber-cyan';

                                    return (
                                        <div key={type.key} className={`bg-black/40 border border-${catColor}/20 rounded-lg p-3 flex flex-col gap-3 transition-all ${res.value > 0 || res.immunity || res.vulnerable ? 'border-opacity-100 shadow-[0_0_10px_rgba(0,0,0,0.5)]' : 'border-opacity-20'}`}>
                                            <div className="flex items-center justify-between">
                                                <span className="text-white font-semibold flex items-center gap-2 text-sm uppercase truncate">
                                                    <i className={`fa-solid ${type.icon} text-${catColor}/80`}></i> {type.name}
                                                </span>
                                                <input
                                                    className={`bg-black/40 border border-${catColor}/30 rounded px-2 py-1 text-center w-12 text-sm focus:outline-none focus:border-${catColor}/60 transition-colors font-mono text-${catColor}`}
                                                    type="number"
                                                    value={res.value}
                                                    onChange={(e) => updateResistance(type.key, 'value', e.target.value)}
                                                />
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                                <label
                                                    onClick={() => updateResistance(type.key, 'immunity', !res.immunity)}
                                                    className="flex items-center gap-2 cursor-pointer group"
                                                >
                                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${res.immunity ? 'bg-cyber-green border-cyber-green shadow-[0_0_10px_rgba(57,255,20,0.5)]' : 'border-cyber-green/30 group-hover:border-cyber-green/50'}`}>
                                                        {res.immunity && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                                                    </div>
                                                    <span className={`text-[10px] uppercase font-bold tracking-tighter transition-colors ${res.immunity ? 'text-cyber-green' : 'text-cyber-gray group-hover:text-cyber-green'}`}>Imune</span>
                                                </label>
                                                <label
                                                    onClick={() => updateResistance(type.key, 'vulnerable', !res.vulnerable)}
                                                    className="flex items-center gap-2 cursor-pointer group"
                                                >
                                                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${res.vulnerable ? 'bg-cyber-red border-cyber-red shadow-[0_0_10px_rgba(255,49,49,0.5)]' : 'border-cyber-red/30 group-hover:border-cyber-red/50'}`}>
                                                        {res.vulnerable && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                                                    </div>
                                                    <span className={`text-[10px] uppercase font-bold tracking-tighter transition-colors ${res.vulnerable ? 'text-cyber-red' : 'text-cyber-gray group-hover:text-cyber-red'}`}>Vuln.</span>
                                                </label>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-end p-6 border-t border-white/10">
                    <button onClick={() => setActiveModal(null)} className="px-8 py-2 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded text-sm font-bold uppercase tracking-widest text-white shadow-neon-pink hover:scale-105 active:scale-95 transition-all">Fechar</button>
                </ModalFooter>
            </Modal>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteAttack}
                title="Confirmar Exclusão"
                message={`Tem certeza que deseja excluir o ataque "${attackToDelete?.name}"? Esta ação não pode ser desfeita.`}
                confirmText="Excluir"
            />

            <ConfirmationModal
                isOpen={isArmorDeleteModalOpen}
                onClose={() => setIsArmorDeleteModalOpen(false)}
                onConfirm={confirmDeleteArmor}
                title="Deletar Armadura"
                message={`Deseja realmente apagar a armadura "${armorToDelete?.name}"?`}
                confirmText="Deletar"
            />
        </div>
    );
};

export default CombatTab;
