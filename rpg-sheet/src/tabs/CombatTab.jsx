import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

const CombatTab = () => {
    const [activeModal, setActiveModal] = useState(null);

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
            </div>

            <Modal isOpen={activeModal === 'weapon'} onClose={() => setActiveModal(null)}>
                <ModalHeader onClose={() => setActiveModal(null)}>
                    <h2 className="text-xl font-display font-bold text-white tracking-widest uppercase flex items-center gap-3">
                        <i className="fa-solid fa-khanda text-cyber-pink"></i> Detalhes da Arma
                    </h2>
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-cyber-gray mb-1 block">Nome</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white outline-none focus:border-cyber-pink" defaultValue="Espada Longa" />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-cyber-gray mb-1 block">Dano</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded p-2 text-white outline-none focus:border-cyber-pink" defaultValue="2d8+4" />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs font-bold uppercase text-cyber-gray hover:text-white">Cancelar</button>
                    <button onClick={() => setActiveModal(null)} className="px-6 py-2 bg-cyber-pink text-white text-xs font-bold uppercase rounded shadow-lg shadow-cyber-pink/20">Salvar</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default CombatTab;
