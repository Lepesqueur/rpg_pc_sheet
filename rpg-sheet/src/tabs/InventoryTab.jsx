import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

const InventoryTab = () => {
    const [editingItem, setEditingItem] = useState(null);

    const items = [
        { name: "Poção de Cura", icon: "fa-flask", color: "text-rpg-pink", qty: "x3", uses: "1/1", type: "Consumível", price: "5 po", weight: "0.5kg" },
        { name: "Pergaminho de Mísseis", icon: "fa-scroll", color: "text-rpg-gold", qty: "x2", uses: "3/3", type: "Consumível", price: "15 po", weight: "0.1kg" },
        { name: "Corda de Cânhamo", icon: "fa-dharmachakra", color: "text-rpg-gold", qty: "x1", uses: "-", type: "Item", price: "2 po", weight: "2kg" },
        { name: "Adaga", icon: "fa-khanda", color: "text-gray-300", qty: "x1", uses: "-", type: "Arma", price: "10 po", weight: "1kg" }
    ];

    const peculiarities = [
        { name: "Sentidos Aguçados", icon: "fa-fingerprint", color: "text-cyber-purple", val: "+2", valColor: "text-[#00ff99]" },
        { name: "Fobia de Escuro", icon: "fa-ghost", color: "text-cyber-pink", val: "-3", valColor: "text-red-400" },
        { name: "Memória Eidética", icon: "fa-book-open", color: "text-cyber-yellow", val: "+4", valColor: "text-[#00ff99]" },
        { name: "Voto de Silêncio", icon: "fa-link-slash", color: "text-gray-500", val: "-2", valColor: "text-red-400" }
    ];

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto min-h-[600px]">
                <article className="lg:col-span-8 glass-card rounded-xl border border-white/10 flex overflow-hidden">
                    <div className="w-10 md:w-12 border-r border-white/10 flex flex-col justify-between items-center py-6 text-xs text-cyber-gray font-mono tracking-widest select-none bg-black/40">
                        <div className="writing-vertical-lr text-white font-bold text-lg mt-4 font-display">INVENTÁRIO</div>
                        <div className="h-full w-[1px] bg-gray-800 my-4"></div>
                        <div className="writing-vertical-lr text-cyber-gray font-mono tracking-widest mb-4">SISTEMA DE CARGA</div>
                    </div>
                    <div className="flex-grow flex flex-col bg-transparent pl-2">
                        <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-white/10 bg-white/5">
                            <h2 className="text-lg font-bold text-white tracking-wide font-display">FILTRO DE CARGA</h2>
                            <div className="flex items-center gap-3 mt-3 md:mt-0">
                                <div className="flex items-center bg-black/40 border border-white/10 rounded px-2 py-1 focus-within:border-cyber-yellow transition-all">
                                    <label className="text-cyber-yellow font-bold text-xs mr-2 font-mono uppercase">PO</label>
                                    <input className="bg-transparent border-none p-0 w-16 text-right text-white text-sm font-mono focus:ring-0" type="number" defaultValue="1250" />
                                </div>
                                <div className="flex items-center bg-black/40 border border-white/10 rounded px-2 py-1 focus-within:border-gray-400 transition-all">
                                    <label className="text-gray-400 font-bold text-xs mr-2 font-mono uppercase">PP</label>
                                    <input className="bg-transparent border-none p-0 w-12 text-right text-white text-sm font-mono focus:ring-0" type="number" defaultValue="45" />
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-2">
                            <table className="w-full text-left border-collapse">
                                <thead className="text-[10px] uppercase text-cyber-gray font-semibold tracking-wider sticky top-0 bg-cyber-bg z-10">
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
                                        <tr key={item.name} onClick={() => setEditingItem(item.name)} className="hover:bg-white/5 transition-colors cursor-pointer group">
                                            <td className="p-2 text-center text-lg"><i className={`fa-solid ${item.icon} ${item.color}`}></i></td>
                                            <td className="p-2 font-medium text-white group-hover:text-cyber-pink transition-colors">{item.name}</td>
                                            <td className="p-2 text-center text-cyber-gray">{item.qty}</td>
                                            <td className="p-2 text-center text-xs text-[#00ff99]">{item.uses}</td>
                                            <td className="p-2 text-xs text-[#aaaaaa]">{item.type}</td>
                                            <td className="p-2 text-right text-cyber-gray text-xs">{item.weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-black/60 border-t border-white/10 mt-auto">
                            <div className="flex justify-between text-xs text-cyber-gray mb-1">
                                <span>Carga Total</span>
                                <span className="text-white font-mono uppercase">35 / 100 kg</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div className="h-full w-[35%] bg-gradient-to-r from-cyber-purple to-cyber-pink shadow-[0_0_8px_#ff0099]"></div>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="lg:col-span-4 flex flex-col gap-6 h-full">
                    <article className="glass-card rounded-xl border border-white/10 flex flex-col p-6 flex-1">
                        <h2 className="text-lg font-bold text-white tracking-wide mb-4 border-b border-white/10 pb-2 font-display uppercase italic">BIOGRAFIA & LOGS</h2>
                        <div className="text-sm text-cyber-gray leading-relaxed font-sans space-y-4 overflow-y-auto custom-scrollbar pr-2 h-64 lg:h-auto">
                            <p className="first-letter:float-left first-letter:mr-2 first-letter:text-cyber-yellow first-letter:font-bold first-letter:text-4xl">
                                Registros decimais encontrados no núcleo de memória de Aeliana sugerem uma origem fora do Setor 7. Protocolos de segurança nível Archon ativa...
                            </p>
                        </div>
                    </article>
                    <article className="glass-card rounded-xl border border-white/10 flex flex-col p-6 flex-1">
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                            <h2 className="text-lg font-bold text-white tracking-wide font-display uppercase italic">PECULIARIDADES</h2>
                            <button className="text-cyber-gray hover:text-white transition-colors">
                                <i className="fa-solid fa-plus text-xs border border-white/20 p-1 rounded hover:border-white"></i>
                            </button>
                        </div>
                        <div className="overflow-y-auto custom-scrollbar pr-2 flex-grow">
                            <ul className="space-y-3">
                                {peculiarities.map((p) => (
                                    <li key={p.name} className="flex items-center justify-between group bg-white/5 p-2 rounded border border-transparent hover:border-white/10 transition-all">
                                        <div className="flex items-center gap-3">
                                            <i className={`fa-solid ${p.icon} ${p.color}`}></i>
                                            <span className="text-sm font-medium text-gray-200">{p.name}</span>
                                        </div>
                                        <span className={`text-sm font-bold ${p.valColor} bg-white/5 px-2 py-0.5 rounded border border-white/10`}>{p.val}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                </div>
            </div>

            <Modal isOpen={!!editingItem} onClose={() => setEditingItem(null)} maxWidth="max-w-2xl">
                <ModalHeader onClose={() => setEditingItem(null)} className="bg-gradient-to-r from-cyber-pink/10 to-transparent">
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3 font-display uppercase">
                        <span className="text-cyber-pink">EDITAR:</span> {editingItem}
                    </h2>
                </ModalHeader>
                <ModalBody className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Quantidade</label>
                            <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-pink outline-none" type="number" defaultValue="1" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest text-cyber-gray font-bold">Peso (kg)</label>
                            <input className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-1 focus:ring-cyber-pink outline-none" type="number" step="0.1" defaultValue="0.5" />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-black/60 flex justify-between">
                    <button className="flex items-center gap-2 text-red-500 hover:text-white transition-all font-semibold uppercase text-xs tracking-widest">
                        <i className="fa-solid fa-trash-can"></i> Excluir
                    </button>
                    <button onClick={() => setEditingItem(null)} className="bg-cyber-pink text-white px-8 py-2.5 rounded-lg font-bold shadow-neon-pink hover:scale-[1.02] transition-all uppercase text-xs tracking-widest">Salvar</button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default InventoryTab;
