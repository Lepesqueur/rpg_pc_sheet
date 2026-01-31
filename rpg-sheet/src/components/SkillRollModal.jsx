import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { ATTR_MAP } from '../data/rules';

const SkillRollModal = ({ isOpen, onClose, skill, allAttributes, sourceItem, onConfirm }) => {
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
            <div className="bg-black/40 p-6 border-b border-white/10 flex justify-between items-center shrink-0 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-pink to-transparent opacity-70"></div>
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wider uppercase drop-shadow-[0_0_8px_rgba(255,0,255,0.5)] font-display">
                        Rolagem: {skill.name}
                    </h2>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold bg-white/5 px-2 py-0.5 rounded border border-white/5">Proficiência</span>
                        <div className="flex gap-1.5">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`transform rotate-45 w-2.5 h-2.5 border transition-all duration-300 ${i <= skill.level ? 'bg-cyber-yellow border-cyber-yellow shadow-[0_0_6px_#f1c40f]' : 'border-white/20 bg-transparent'}`}></div>
                            ))}
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-colors">
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>

            {sourceItem && (
                <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <i className="fa-solid fa-crosshairs text-cyber-pink text-xs"></i>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">{sourceItem.name}</span>
                    </div>
                    {(sourceItem.costs?.focus > 0 || sourceItem.costs?.vitality > 0 || sourceItem.costs?.will > 0) && (
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] text-gray-500 uppercase font-bold tracking-widest">Custo:</span>
                            {sourceItem.costs?.vitality > 0 && (
                                <div className="flex items-center gap-1 text-cyber-pink">
                                    <i className="fa-solid fa-heart text-[10px]"></i>
                                    <span className="font-mono font-bold text-[10px]">{sourceItem.costs.vitality}</span>
                                </div>
                            )}
                            {sourceItem.costs?.focus > 0 && (
                                <div className="flex items-center gap-1 text-cyber-purple">
                                    <i className="fa-solid fa-bolt-lightning text-[10px]"></i>
                                    <span className="font-mono font-bold text-[10px]">{sourceItem.costs.focus}</span>
                                </div>
                            )}
                            {sourceItem.costs?.will > 0 && (
                                <div className="flex items-center gap-1 text-cyber-yellow">
                                    <i className="fa-solid fa-brain text-[10px]"></i>
                                    <span className="font-mono font-bold text-[10px]">{sourceItem.costs.will}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

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
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${selectedAttr === attr.name
                                        ? 'border-cyber-pink bg-cyber-pink/10 shadow-[0_0_15px_rgba(255,0,255,0.2)]'
                                        : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                                        }`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br from-cyber-pink/20 to-transparent opacity-0 transition-opacity duration-300 ${selectedAttr === attr.name ? 'opacity-100' : ''}`}></div>
                                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest relative z-10">{attr.name}</span>
                                    <span className="text-3xl font-bold text-white mt-1 relative z-10 font-display">{attr.value}</span>
                                    <div className={`text-[10px] px-2 py-0.5 rounded mt-2 font-black relative z-10 transition-colors ${selectedAttr === attr.name ? 'bg-cyber-pink text-white' : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'}`}>
                                        +{attr.value} TESTE
                                    </div>
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

                {/* Orientação de Rolagem */}
                <section className="bg-cyber-bg/50 border border-white/10 rounded-xl p-4 space-y-3">
                    <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/10 pb-2">
                        <i className="fa-solid fa-book-open text-cyber-yellow"></i> Guia da Rolagem
                    </h3>

                    {(() => {
                        const baseDice = Math.min((skill?.level || 0) + 1, 3);
                        const finalX = baseDice + advantage;
                        const isDisadvantage = finalX <= 0;
                        const diceCount = isDisadvantage ? Math.abs(finalX) || 1 : finalX; // Se X=0, assume 1 dado em desvantagem? Ou 2? Usuário disse "X D8". Assumindo abs(X). Se 0, assumo 2 (padrão D&D) ou 1? "X negativo" => X < 0. Se X=0? Tratarei como 1 dado normal ou desvantagem? Vou assumir 2 dados delete menor se X<=0.
                        // Ajuste lógico: Se X > 0, rola X dados. Se X <= 0, rola abs(X) + 2 dados e pega o menor? 
                        // O usuário disse: "Se o X for negativo o jogador joga X D8 em desvantagem". "X" aqui deve ser interpretado como magnitude.
                        // Se X = -2 -> joga 2d8 desvantagem.
                        // Se X = 0 -> joga 1d8 desvantagem? 
                        // Vou usar: Dados = Math.max(1, Math.abs(finalX)) apenas para exibição, e explicar o modo.

                        const displayDice = finalX > 0 ? finalX : (finalX === 0 ? 1 : Math.abs(finalX));
                        const modeLabel = finalX > 0 ? "VANTAGEM (SOMA TUDO)" : "DESVANTAGEM (O MENOR)";
                        const modeColor = finalX > 0 ? "text-cyber-green" : "text-cyber-red";
                        const masterReroll = (skill?.level || 0) >= 3;

                        return (
                            <div className="text-sm space-y-2 font-mono">
                                <div className="flex justify-between items-center text-xs text-gray-400 uppercase font-bold">
                                    <span>Pool Base (Prof + 1)</span>
                                    <span>{baseDice}d8</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-400 uppercase font-bold text-cyber-pink">
                                    <span>Modificador</span>
                                    <span>{advantage > 0 ? `+${advantage}` : advantage}</span>
                                </div>
                                <div className="h-[1px] bg-white/10 my-1"></div>
                                <div className="flex justify-between items-center font-bold">
                                    <span className="text-white uppercase text-xs">Total de Dados (X)</span>
                                    <span className={`text-lg ${modeColor}`}>{displayDice}d8</span>
                                </div>

                                <div className="mt-2 text-xs bg-black/40 p-3 rounded text-gray-300 leading-relaxed border-l-2 border-cyber-yellow">
                                    <p className="mb-1">
                                        <strong className={modeColor}>MODO: {modeLabel}</strong>
                                    </p>
                                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-400">
                                        {finalX > 0 ? (
                                            <li>Role <strong>{displayDice}d8</strong> e considere <strong>TODOS</strong> os resultados.</li>
                                        ) : (
                                            <li>Role <strong>{displayDice === 0 ? "1" : displayDice}d8</strong> e escolha APENAS o <strong>MENOR</strong> resultado.</li>
                                        )}
                                        <li>Some <strong>+{currentAttr?.value || 0}</strong> ({selectedAttr}) ao valor de cada dado mantido.</li>
                                        {masterReroll && (
                                            <li className="text-cyber-yellow">
                                                <strong>MESTRE:</strong> Você pode rerolar o pior dado uma vez!
                                            </li>
                                        )}
                                        <li>Verifique quantos resultados superaram a CD.</li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })()}
                </section>
            </ModalBody>

            <ModalFooter className="p-6 pt-0 bg-transparent border-none">
                <button
                    onClick={() => {
                        if (onConfirm) {
                            // Pass the selected attribute name and advantage value to the callback
                            const success = onConfirm(selectedAttr, advantage);
                            if (success !== false) onClose();
                        } else {
                            onClose();
                        }
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
