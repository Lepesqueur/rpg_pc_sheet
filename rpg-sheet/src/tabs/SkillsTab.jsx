import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

const SkillsTab = () => {
    const [viewingSkill, setViewingSkill] = useState(null);

    const skills = [
        {
            name: "EXPLOSÃO ARCANA",
            id: "Explosão Arcana",
            pa: "3 PA",
            foco: 2,
            icon: "fa-burst",
            color: "neon-pink",
            description: "Libera uma onda de energia bruta em um raio de 3 metros, causando dano mágico crítico.",
            fullDescription: "O conjurador canaliza energia pura do Éter, liberando-a em uma violenta onda de choque ao seu redor. A explosão ignora armaduras físicas convencionais e empurra inimigos pequenos para longe do centro do impacto."
        },
        {
            name: "TELETRANSPORTE MENOR",
            id: "Teletransporte Menor",
            pa: "2 PA",
            foco: 1,
            vit: 1,
            icon: "fa-door-open",
            color: "neon-pink",
            description: "Permite deslocar-se instantaneamente para um ponto visível a até 15 metros."
        },
        {
            name: "ESCUDO PROTETOR",
            id: "Escudo Protetor",
            pa: "1 PA",
            vontade: 5,
            icon: "fa-shield-halved",
            color: "neon-pink",
            description: "Conjura uma barreira translúcida que absorve os próximos 10 pontos de dano físico."
        }
    ];

    const talents = [
        {
            name: "MESTRE DE ARMAS",
            type: "Passiva",
            icon: "fa-gavel",
            color: "neon-yellow",
            description: "Adiciona +2 em jogadas de ataque com armas pesadas ou de haste."
        },
        {
            name: "SENTIDOS AGUÇADOS",
            type: "Passiva",
            foco: 1,
            icon: "fa-ear-listen",
            color: "neon-yellow",
            description: "Vantagem em testes de Percepção baseados em audição ou olfato."
        },
        {
            name: "RESILIÊNCIA MENTAL",
            type: "Passiva",
            vontade: 2,
            icon: "fa-head-side-virus",
            color: "neon-yellow",
            description: "Sua mente é um forte. Imune a efeitos de medo mundanos e resistência a dano psíquico."
        }
    ];

    return (
        <div className="animate-fade-in">
            <section className="glass-card rounded-2xl p-6 min-h-[500px] flex flex-col">
                <div className="mb-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="fa-solid fa-magnifying-glass text-gray-500 text-sm"></i>
                    </div>
                    <input
                        className="w-full bg-black/40 border border-white/10 text-gray-300 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:border-cyber-pink focus:ring-1 focus:ring-cyber-pink transition-all placeholder:text-gray-600 font-sans"
                        placeholder="Filtrar habilidades ou talentos..."
                        type="text"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-6 bg-cyber-pink shadow-neon-pink"></div>
                            <h2 className="text-white font-display font-bold text-lg tracking-widest uppercase">Habilidades Básicas</h2>
                        </div>

                        {skills.map((skill) => (
                            <div
                                key={skill.name}
                                onClick={() => skill.fullDescription && setViewingSkill(skill)}
                                className={`group relative bg-white/5 border border-white/10 hover:border-cyber-pink/50 rounded-xl p-5 transition-all duration-300 ${skill.fullDescription ? 'cursor-pointer' : ''}`}
                            >
                                <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                                    <span className="px-2 py-0.5 bg-cyber-pink/20 text-cyber-pink text-[10px] font-bold border border-cyber-pink/30 rounded">{skill.pa}</span>
                                    <div className="flex gap-2">
                                        {skill.foco && (
                                            <span className="flex items-center gap-1 text-cyber-purple text-[10px] font-bold" title="Custo de Foco">
                                                <i className="fa-solid fa-bolt text-[9px]"></i> {skill.foco}
                                            </span>
                                        )}
                                        {skill.vit && (
                                            <span className="flex items-center gap-1 text-cyber-pink text-[10px] font-bold" title="Custo de Vitalidade">
                                                <i className="fa-solid fa-heart text-[9px]"></i> {skill.vit}
                                            </span>
                                        )}
                                        {skill.vontade && (
                                            <span className="flex items-center gap-1 text-cyber-yellow text-[10px] font-bold" title="Custo de Vontade">
                                                <i className="fa-solid fa-brain text-[9px]"></i> {skill.vontade}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-cyber-pink/10 border border-cyber-pink/20 group-hover:shadow-[0_0_10px_#ff009966] transition-all">
                                        <i className={`fa-solid ${skill.icon} text-2xl text-cyber-pink`}></i>
                                    </div>
                                    <div className="flex-grow pr-16">
                                        <h3 className="font-display text-white font-bold tracking-wider mb-1 uppercase">{skill.name}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{skill.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-6 bg-cyber-yellow shadow-neon-yellow"></div>
                            <h2 className="text-white font-display font-bold text-lg tracking-widest uppercase">Talentos</h2>
                        </div>

                        {talents.map((talent) => (
                            <div
                                key={talent.name}
                                className="group relative bg-white/5 border border-white/10 hover:border-cyber-yellow/50 rounded-xl p-5 transition-all duration-300"
                            >
                                <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                                    <span className="px-2 py-0.5 bg-cyber-yellow/20 text-cyber-yellow text-[10px] font-bold border border-cyber-yellow/30 rounded uppercase">{talent.type}</span>
                                    <div className="flex gap-2">
                                        {talent.foco && (
                                            <span className="flex items-center gap-1 text-cyber-purple text-[10px] font-bold" title="Custo de Foco">
                                                <i className="fa-solid fa-bolt text-[9px]"></i> {talent.foco}
                                            </span>
                                        )}
                                        {talent.vontade && (
                                            <span className="flex items-center gap-1 text-cyber-yellow text-[10px] font-bold" title="Custo de Vontade">
                                                <i className="fa-solid fa-brain text-[9px]"></i> {talent.vontade}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-cyber-yellow/10 border border-cyber-yellow/20 group-hover:shadow-[0_0_10px_#ffd70066] transition-all">
                                        <i className={`fa-solid ${talent.icon} text-2xl text-cyber-yellow`}></i>
                                    </div>
                                    <div className="flex-grow pr-16">
                                        <h3 className="font-display text-white font-bold tracking-wider mb-1 uppercase">{talent.name}</h3>
                                        <p className="text-sm text-gray-400 leading-relaxed">{talent.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Modal isOpen={!!viewingSkill} onClose={() => setViewingSkill(null)} maxWidth="max-w-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-pink to-transparent opacity-50 z-20"></div>
                <ModalHeader onClose={() => setViewingSkill(null)} className="p-6 md:p-8">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-2xl bg-cyber-pink/10 border border-cyber-pink/40 flex items-center justify-center text-cyber-pink shadow-[0_0_20px_rgba(255,0,153,0.2)]">
                            <i className={`fa-solid ${viewingSkill?.icon} text-4xl`}></i>
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-bold uppercase tracking-wider text-white">{viewingSkill?.name}</h2>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                <span className="px-2.5 py-0.5 rounded-md bg-cyber-pink/20 border border-cyber-pink/40 text-[10px] font-bold text-cyber-pink uppercase tracking-widest">Habilidade Básica</span>
                            </div>
                        </div>
                    </div>
                </ModalHeader>
                <ModalBody className="p-6 md:p-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <p className="text-slate-300 leading-relaxed">
                            {viewingSkill?.fullDescription}
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter className="p-6 bg-zinc-900/80 gap-6">
                    <button onClick={() => setViewingSkill(null)} className="px-8 py-3 rounded-xl bg-cyber-pink hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-cyber-pink/20 transition-all uppercase tracking-wide">
                        Ativar Habilidade
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default SkillsTab;
