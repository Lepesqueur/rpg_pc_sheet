import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { ATTR_MAP } from '../data/rules';

const SkillRollModal = ({ isOpen, onClose, skill, allAttributes }) => {
    const [selectedAttr, setSelectedAttr] = useState(null);
    const [advantage, setAdvantage] = useState(0);

    // Map abbreviations from rules.js (DES, INTUI, etc) to attribute labels (Des, Intu, etc)
    const skillAttrs = (Array.isArray(skill?.attr) ? skill.attr : [skill?.attr]).map(a => a?.toUpperCase());

    const viableAttributes = (allAttributes || []).filter(attr => {
        const normalizedLabel = attr.label;
        return skillAttrs.some(sa => ATTR_MAP[sa] === normalizedLabel || sa === normalizedLabel.toUpperCase());
    });

    useEffect(() => {
        if (viableAttributes.length > 0 && !selectedAttr) {
            setSelectedAttr(viableAttributes[0].name);
        }
    }, [viableAttributes, selectedAttr]);

    if (!skill) return null;

    const currentAttr = viableAttributes.find(a => a.name === selectedAttr) || viableAttributes[0] || {};

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-lg">
            {/* Header Area */}
            <div className="bg-black/40 p-6 border-b border-white/10 flex justify-between items-center shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]">
                        Rolagem: {skill.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Proficiência</span>
                        <div className="flex gap-1 text-cyber-yellow text-[10px]">
                            {[1, 2, 3].map(i => (
                                <i key={i} className={`fa-solid fa-diamond ${i <= skill.level ? 'text-[#f1c40f] drop-shadow-[0_0_3px_#f1c40f]' : 'text-white/10'}`}></i>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            <ModalBody className="p-6 space-y-8 overflow-y-auto">
                {/* Atributo Base Section */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <i className="fa-solid fa-sliders text-cyber-blue"></i> Selecionar Atributo Base
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {viableAttributes.map((attr) => (
                            <div key={attr.name} className="relative">
                                <input
                                    type="radio"
                                    id={`attr_${attr.name}`}
                                    name="base_attr"
                                    className="hidden"
                                    checked={selectedAttr === attr.name}
                                    onChange={() => setSelectedAttr(attr.name)}
                                />
                                <label
                                    htmlFor={`attr_${attr.name}`}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer ${selectedAttr === attr.name
                                            ? 'border-cyber-pink bg-cyber-pink/10 shadow-[0_0_15px_rgba(255,0,255,0.2)]'
                                            : 'border-white/10 bg-white/5 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">{attr.name}</span>
                                    <span className="text-2xl font-bold text-white mt-1">{attr.value}</span>
                                    <span className="text-[10px] bg-cyber-pink/20 text-cyber-pink px-2 py-0.5 rounded mt-2 font-black">+{attr.value}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Vantagem/Desvantagem Section */}
                <section className="space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <i className="fa-solid fa-scale-balanced text-cyber-purple"></i> Vantagens e Desvantagens
                    </h3>
                    <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex flex-col items-center">
                                <span className="text-cyber-red font-bold text-xl drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">-7</span>
                                <span className="text-[8px] text-gray-500 uppercase font-black">Máx Desv.</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={`font-bold text-2xl transition-all ${advantage > 0 ? 'text-cyber-green' : advantage < 0 ? 'text-cyber-red' : 'text-white'}`}>
                                    {advantage > 0 ? `+${advantage}` : advantage}
                                </span>
                                <span className="text-[8px] text-gray-500 uppercase font-black">Ajuste</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-cyber-green font-bold text-xl drop-shadow-[0_0_5px_rgba(0,255,0,0.5)]">+7</span>
                                <span className="text-[8px] text-gray-500 uppercase font-black">Máx Vant.</span>
                            </div>
                        </div>

                        <input
                            type="range"
                            min="-7"
                            max="7"
                            step="1"
                            value={advantage}
                            onChange={(e) => setAdvantage(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyber-pink"
                        />

                        <div className="flex justify-between mt-3 px-1">
                            <div className="flex gap-1.5 overflow-hidden">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <span key={i} className={`w-1 h-1 rounded-full ${advantage <= -(i + 1) ? 'bg-cyber-red shadow-[0_0_3px_red]' : 'bg-white/10'}`}></span>
                                ))}
                            </div>
                            <span className={`w-1.5 h-1.5 rounded-full ${advantage === 0 ? 'bg-white shadow-[0_0_5px_white]' : 'bg-white/20'}`}></span>
                            <div className="flex gap-1.5 overflow-hidden">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <span key={i} className={`w-1 h-1 rounded-full ${advantage >= (i + 1) ? 'bg-cyber-green shadow-[0_0_3px_green]' : 'bg-white/10'}`}></span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </ModalBody>

            <ModalFooter className="p-6 pt-0 bg-transparent border-none">
                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="w-full py-4 bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-[0_0_20px_rgba(255,0,153,0.4)] hover:shadow-[0_0_30px_rgba(255,0,153,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                    <i className="fa-solid fa-dice-d20 text-xl"></i>
                    Rolar Dados
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default SkillRollModal;
