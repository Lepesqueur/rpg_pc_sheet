import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

// Componente simples de progresso circular usando SVG
const CircularProgress = ({ value, max, color, label, sublabel, shadowColor }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / max) * circumference;
    const offset = circumference - progress;

    return (
        <div className="flex flex-col items-center gap-2 w-full shrink-0">
            <div className="relative w-[90px] h-[90px] flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="45"
                        cy="45"
                        r={radius}
                        stroke="#2d2d3d"
                        strokeWidth="6"
                        fill="transparent"
                    />
                    {/* Progress circle */}
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
                    <span className="text-lg font-bold text-white leading-none">
                        {value}<span className="text-[10px] text-cyber-gray ml-0.5">/{max}</span>
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest mt-1" style={{ color }}>{label}</span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color }}>{sublabel}</span>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-4 h-4 border rounded-sm cursor-pointer transition-colors hover:bg-white/10" style={{ borderColor: color }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CombatTab = () => {
    const [activeModal, setActiveModal] = useState(null); // 'weapon', 'armor', 'resistances', 'conditions'

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">

                {/* 1. ATAQUES & 2. ARMADURAS */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-3 border-l-4 border-cyber-pink">Ataques</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-[10px] text-cyber-gray uppercase tracking-wider border-b border-white/5">
                                    <tr>
                                        <th className="pb-2 font-semibold">Arma</th>
                                        <th className="pb-2 font-semibold text-center">AP</th>
                                        <th className="pb-2 font-semibold text-center">Recurso</th>
                                        <th className="pb-2 font-semibold text-center">Dano</th>
                                        <th className="pb-2 font-semibold text-center">Alcance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr onClick={() => setActiveModal('weapon')} className="group hover:bg-white/5 transition-colors cursor-pointer text-[13px]">
                                        <td className="py-3 font-bold text-white group-hover:text-cyber-pink transition-colors">Espada Longa</td>
                                        <td className="py-3 text-center text-cyber-yellow font-mono font-bold">3</td>
                                        <td className="py-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <i className="fa-solid fa-heart text-[8px] text-cyber-pink font-bold"></i>
                                                <span className="text-white font-mono font-bold">2</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-center text-white font-mono font-bold">2d8+4</td>
                                        <td className="py-3 text-center text-gray-400 font-mono">C.C.</td>
                                    </tr>
                                    <tr className="group hover:bg-white/5 transition-colors cursor-pointer text-[13px]">
                                        <td className="py-3 font-bold text-white group-hover:text-cyber-pink transition-colors">Arco Curto</td>
                                        <td className="py-3 text-center text-cyber-yellow font-mono font-bold">4</td>
                                        <td className="py-3 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <i className="fa-solid fa-bolt-lightning text-[8px] text-cyber-purple font-bold"></i>
                                                <span className="text-white font-mono font-bold">5</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-center text-white font-mono font-bold">1d6+3</td>
                                        <td className="py-3 text-center text-gray-400 font-mono">18m</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-3 border-l-4 border-cyber-yellow">Armaduras</h3>
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
                                    <tr onClick={() => setActiveModal('armor')} className="group hover:bg-white/5 transition-colors cursor-pointer text-[13px]">
                                        <td className="py-3 flex items-center gap-3">
                                            <i className="fa-solid fa-shield-halved text-cyber-yellow text-xs"></i>
                                            <span className="font-bold text-white group-hover:text-cyber-yellow">Colete de Kevlar</span>
                                        </td>
                                        <td className="py-3 text-center text-cyber-yellow font-bold text-lg font-mono">4</td>
                                        <td className="py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <input className="w-16 bg-black/40 border border-cyber-yellow/30 rounded text-cyber-yellow font-bold text-center py-1 focus:ring-1 focus:ring-cyber-yellow focus:border-cyber-yellow outline-none transition-all shadow-[0_0_5px_rgba(255,215,0,0.2)]" type="number" defaultValue="4" onClick={(e) => e.stopPropagation()} />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="group hover:bg-white/5 transition-colors cursor-pointer text-[13px]">
                                        <td className="py-3 flex items-center gap-3">
                                            <i className="fa-solid fa-mask text-cyber-yellow text-xs"></i>
                                            <span className="font-bold text-white group-hover:text-cyber-yellow">Elmo Neural</span>
                                        </td>
                                        <td className="py-3 text-center text-cyber-yellow font-bold text-lg font-mono">2</td>
                                        <td className="py-3 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <input className="w-16 bg-black/40 border border-cyber-yellow/30 rounded text-cyber-yellow font-bold text-center py-1 focus:ring-1 focus:ring-cyber-yellow focus:border-cyber-yellow outline-none transition-all shadow-[0_0_5px_rgba(255,215,0,0.2)]" type="number" defaultValue="2" onClick={(e) => e.stopPropagation()} />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* 3. DEFESAS PRIMÁRIAS & 4. RESISTÊNCIAS ESPECIAIS */}
                <div className="lg:col-span-4 flex flex-col space-y-6">
                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-4 pl-3 border-l-4 border-cyber-purple">Defesas Primárias</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-black/40 p-3 rounded-lg flex flex-col items-center border-b-2 border-cyber-purple/50 group hover:bg-cyber-purple/5 transition-all">
                                <i className="fa-solid fa-shield-halved text-xl text-cyber-purple mb-1 group-hover:scale-110 transition-transform"></i>
                                <span className="text-[9px] text-cyber-gray uppercase tracking-widest font-bold">Fortitude</span>
                                <span className="text-2xl font-bold text-white">16</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-lg flex flex-col items-center border-b-2 border-cyber-pink/50 group hover:bg-cyber-pink/5 transition-all">
                                <i className="fa-solid fa-bolt-lightning text-xl text-cyber-pink mb-1 group-hover:scale-110 transition-transform"></i>
                                <span className="text-[9px] text-cyber-gray uppercase tracking-widest font-bold">Reflexo</span>
                                <span className="text-2xl font-bold text-white">18</span>
                            </div>
                            <div className="bg-black/40 p-3 rounded-lg flex flex-col items-center border-b-2 border-cyber-yellow/50 group hover:bg-cyber-yellow/5 transition-all">
                                <i className="fa-solid fa-hand-fist text-xl text-cyber-yellow mb-1 group-hover:scale-110 transition-transform"></i>
                                <span className="text-[9px] text-cyber-gray uppercase tracking-widest font-bold">Tenacidade</span>
                                <span className="text-2xl font-bold text-white">14</span>
                            </div>
                        </div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase pl-3 border-l-4 border-cyber-yellow">Resistências Especiais</h3>
                            <button onClick={() => setActiveModal('resistances')} className="text-cyber-gray hover:text-white"><i className="fa-solid fa-pen-to-square text-xs"></i></button>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-cyber-purple text-[16px]">verified_user</span>
                                    <span className="text-[10px] font-bold text-cyber-purple uppercase tracking-tighter">Resistências</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1">
                                        <i className="fa-solid fa-fire text-[9px]"></i> Fogo (10)
                                    </span>
                                    <span className="bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1">
                                        <i className="fa-solid fa-gavel text-[9px]"></i> Físico (5)
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-cyber-red text-[16px]">warning</span>
                                    <span className="text-[10px] font-bold text-cyber-red uppercase tracking-tighter">Vulnerabilidades</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="bg-cyber-red/10 border border-cyber-red/30 text-cyber-red px-2 py-1 rounded text-[11px] font-bold flex items-center gap-1">
                                        <i className="fa-solid fa-bolt text-[9px]"></i> Elétrico
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. STATUS E CONDIÇÕES */}
                <div className="lg:col-span-3 border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                    <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase mb-6 pl-3 border-l-4 border-cyber-yellow">Status e Condições</h3>
                    <div className="flex flex-col gap-6 items-center mb-6">
                        <CircularProgress
                            value={80}
                            max={100}
                            color="#ff0099"
                            label="Vitalidade"
                            sublabel="Ferida"
                        />
                        <CircularProgress
                            value={45}
                            max={50}
                            color="#bd00ff"
                            label="Foco"
                            sublabel="Fadiga"
                        />
                        <CircularProgress
                            value={28}
                            max={40}
                            color="#ffd700"
                            label="Vontade"
                            sublabel="Trauma"
                        />
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="text-cyber-gray text-[10px] font-bold tracking-[0.2em] uppercase pl-3 border-l-4 border-cyber-pink">Condições Ativas</h4>
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
                        <div className="w-12 h-12 rounded-lg bg-cyber-pink/20 border border-cyber-pink/50 flex items-center justify-center shadow-neon-pink"><i className="fa-solid fa-sword text-cyber-pink text-xl"></i></div>
                        <div><h2 className="text-2xl font-bold tracking-tight text-white uppercase font-display">Editar Ataque</h2><p className="text-cyber-gray text-xs font-semibold tracking-widest uppercase font-mono">Espada Longa</p></div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="flex flex-col gap-4">
                        <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1">Dano</label>
                        <input className="bg-black/40 border border-white/10 rounded-lg py-3 px-4 text-white font-mono text-xl outline-none focus:border-cyber-pink transition-all" type="text" defaultValue="2d8+4" />
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    <button className="px-6 py-2.5 rounded-lg border border-cyber-red/50 text-cyber-red font-bold uppercase text-xs hover:bg-cyber-red/10 transition-all">Excluir</button>
                    <button onClick={() => setActiveModal(null)} className="px-8 py-2.5 rounded-lg bg-cyber-pink text-white font-extrabold uppercase text-xs shadow-neon-pink hover:scale-105 transition-all">Salvar</button>
                </ModalFooter>
            </Modal>

            {/* Other modals (Resistances, Armor, Conditions) following the same logic */}
            <Modal isOpen={activeModal === 'resistances'} onClose={() => setActiveModal(null)} maxWidth="max-w-3xl">
                <ModalHeader onClose={() => setActiveModal(null)} className="bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-cyber-purple/20 border border-cyber-purple/50 flex items-center justify-center shadow-neon-purple"><i className="fa-solid fa-shield-virus text-cyber-purple text-xl"></i></div>
                        <div><h2 className="text-2xl font-bold tracking-tight text-white uppercase font-display">Editar Resistências</h2><p className="text-cyber-gray text-xs font-semibold tracking-widest uppercase font-mono">Modificadores de Dano</p></div>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1">Fogo</label>
                            <input className="bg-black/40 border border-white/10 rounded px-2 py-2 text-center text-white font-mono" type="number" defaultValue="10" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-cyber-gray uppercase font-bold ml-1">Físico</label>
                            <input className="bg-black/40 border border-white/10 rounded px-2 py-2 text-center text-white font-mono" type="number" defaultValue="5" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60">
                    <button onClick={() => setActiveModal(null)} className="px-8 py-2.5 rounded-lg bg-cyber-purple text-white font-extrabold uppercase text-xs shadow-neon-purple hover:scale-105 transition-all">Salvar Alterações</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default CombatTab;
