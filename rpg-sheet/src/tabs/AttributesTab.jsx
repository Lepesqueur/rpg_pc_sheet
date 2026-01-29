import React from 'react';
import { SKILLS_CATEGORIES } from '../data/rules';

const AttributesTab = () => {
    return (
        <div className="animate-fade-in">
            <main className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
                {Object.entries(SKILLS_CATEGORIES).map(([key, category]) => (
                    <section key={key}>
                        <div
                            className="bg-cyber-panel/40 rounded-xl p-5 border shadow-[0_0_15px_rgba(241,196,15,0.05)] h-full"
                            style={{ borderColor: category.borderColor + '66' }}
                        >
                            <h2 className="text-[#ff00ff] font-bold uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-white/10 pb-2">
                                <i className={`fa-solid ${category.icon}`}></i> {category.label}
                            </h2>
                            <ul className="space-y-3">
                                {category.skills.map((skill) => (
                                    <li key={skill.name} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-1 rounded transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[#ff00ff] group-hover:bg-[#ff00ff] group-hover:text-black transition-colors">
                                                <i className={`fa-solid ${skill.icon}`}></i>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="text-sm font-bold text-gray-200">{skill.name}</div>
                                                {(Array.isArray(skill.attr) ? skill.attr : [skill.attr]).map((a) => (
                                                    <span key={a} className={`text-[10px] px-1 rounded font-mono uppercase font-bold ${a === 'DES' ? 'bg-[#2ecc71] text-black' :
                                                            a === 'VIG' ? 'bg-[#e74c3c] text-white' :
                                                                a === 'INT' ? 'bg-[#3498db] text-white' :
                                                                    a === 'PRE' ? 'bg-[#9b59b6] text-white' :
                                                                        'bg-gray-600 text-white'
                                                        }`}>
                                                        {a}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-1 text-[#f1c40f] text-xs">
                                            {[1, 2, 3].map((i) => (
                                                <i key={i} className={`fa-solid fa-diamond ${i > skill.level ? 'opacity-20' : ''}`}></i>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default AttributesTab;
