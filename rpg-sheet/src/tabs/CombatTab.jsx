import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

const CombatTab = () => {
    const [activeModal, setActiveModal] = useState(null); // 'resistances', 'conditions', 'weapon', 'armor'

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
                <div className="lg:col-span-12">
                    <div className="border border-white/10 rounded-xl p-4 flex flex-col glass-card">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-cyber-gray text-xs font-bold tracking-[0.2em] uppercase pl-3 border-l-4 border-cyber-pink">Arsenal de Ataque</h3>
                            <button onClick={() => setActiveModal('weapon')} className="px-3 py-1 bg-cyber-pink/20 border border-cyber-pink/40 rounded text-[10px] font-bold uppercase hover:bg-cyber-pink/40 transition-all">
                                <i className="fa-solid fa-plus mr-1"></i> Adicionar
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="text-[10px] text-cyber-gray uppercase tracking-wider border-b border-white/5">
                                    <tr>
                                        <th className="pb-2 font-semibold">Arma</th>
                                        <th className="pb-2 font-semibold text-center">AP</th>
                                        <th className="pb-2 font-semibold text-center">Dano</th>
                                        <th className="pb-2 font-semibold text-center">Alcance</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    <tr onClick={() => setActiveModal('weapon')} className="group hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="py-3 font-bold text-white group-hover:text-cyber-pink">Espada Longa</td>
                                        <td className="py-3 text-center text-cyber-yellow font-mono font-bold">3</td>
                                        <td className="py-3 text-center text-white font-mono">2d8+4</td>
                                        <td className="py-3 text-center text-gray-400">C.C.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                    <div className="glass-card rounded-xl p-6 border-t-2 border-cyber-purple/50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-cyber-purple text-xs font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                                <i className="fa-solid fa-shield-virus"></i> Resistências
                            </h3>
                            <button onClick={() => setActiveModal('resistances')} className="text-[10px] text-cyber-gray hover:text-white uppercase font-bold tracking-widest transition-colors border border-white/10 px-2 py-1 rounded">Editar</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                                <div className="text-[10px] text-cyber-gray uppercase font-bold mb-1">Impacto</div>
                                <div className="text-xl font-bold text-white">5</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                                <div className="text-[10px] text-cyber-gray uppercase font-bold mb-1">Corte</div>
                                <div className="text-xl font-bold text-white">3</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                                <div className="text-[10px] text-cyber-gray uppercase font-bold mb-1">Fogo</div>
                                <div className="text-xl font-bold text-white">0</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center text-cyber-pink">
                                <div className="text-[10px] opacity-70 uppercase font-bold mb-1">Mágico</div>
                                <div className="text-xl font-bold">10</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-6">
                    <div className="glass-card rounded-xl p-6 border-t-2 border-cyber-pink/50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-cyber-pink text-xs font-bold tracking-[0.3em] uppercase flex items-center gap-2">
                                <i className="fa-solid fa-skull-crossbones"></i> Condições Ativas
                            </h3>
                            <button onClick={() => setActiveModal('conditions')} className="text-[10px] text-cyber-gray hover:text-white uppercase font-bold tracking-widest transition-colors border border-white/10 px-2 py-1 rounded">Gerenciar</button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-3 py-1 rounded-full bg-cyber-pink/20 border border-cyber-pink/40 text-cyber-pink text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
                                <i className="fa-solid fa-ghost"></i> Amedrontada
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={activeModal === 'weapon'} onClose={() => setActiveModal(null)} maxWidth="max-w-4xl">
                <ModalHeader onClose={() => setActiveModal(null)} className="bg-gradient-to-r from-cyber-pink/10 to-transparent">
                    <h2 className="text-2xl font-bold tracking-wider uppercase italic leading-tight text-white">Painel de Armamento</h2>
                </ModalHeader>
                <ModalBody className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                <h3 className="text-cyber-pink text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
                                    <i className="fa-solid fa-gear text-[10px]"></i> Propriedades Base
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] text-cyber-gray font-bold uppercase tracking-widest mb-2 block">Nome da Arma</label>
                                        <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-pink transition-all font-sans" type="text" defaultValue="Espada Longa" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] text-cyber-gray font-bold uppercase tracking-widest mb-2 block">Dano</label>
                                            <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-pink transition-all font-mono" type="text" defaultValue="2d8+4" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-cyber-gray font-bold uppercase tracking-widest mb-2 block">Custo PA</label>
                                            <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyber-pink transition-all font-mono" type="number" defaultValue="3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    <button className="px-6 py-2.5 rounded-lg border border-cyber-red/50 text-cyber-red font-bold uppercase text-xs">Excluir</button>
                    <button onClick={() => setActiveModal(null)} className="px-8 py-2.5 rounded-lg bg-cyber-pink text-white font-extrabold uppercase text-xs shadow-neon-pink">Salvar</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default CombatTab;
