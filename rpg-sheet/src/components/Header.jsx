import React from 'react';
import { useCharacter } from '../context/CharacterContext';

const Header = () => {
    const { isEditMode, toggleEditMode, characterData, updateName, updateLevel, updateXp, updateNextLevel } = useCharacter();

    return (
        <header className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden mb-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-yellow opacity-50"></div>

            {/* Edit Mode Toggle */}
            <div className="absolute top-4 right-6 z-20">
                <button
                    onClick={toggleEditMode}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 group ${isEditMode
                        ? 'bg-cyber-yellow/20 border-cyber-yellow text-cyber-yellow shadow-[0_0_15px_rgba(255,215,0,0.3)]'
                        : 'bg-white/5 border-white/10 text-cyber-gray hover:border-white/30 hover:text-white'
                        }`}
                >
                    <i className={`fa-solid ${isEditMode ? 'fa-unlock-keyhole' : 'fa-lock'} text-xs`}></i>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        {isEditMode ? 'Modo Edição Ativo' : 'Modo Leitura'}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${isEditMode ? 'bg-cyber-yellow animate-pulse' : 'bg-gray-600'}`}></div>
                </button>
            </div>

            <div className="relative shrink-0 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-pink to-cyber-purple blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <img
                    alt="Aeliana Portrait"
                    className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-cyber-pink shadow-neon-pink object-cover z-10"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL-Rfhvvuljmg4jGXDfv6K9f-p8gl_YGelnFGV46NwdIKq5W6n9_oax95Cw3LFCCnknNkNWUFEsB1Gmv92NJAF-ATelbs3tiPKx5ulVbkWzHKYqjqICpIWYWGZ5Ty_Zl8w-FS0tDI_ZBIAQ9W6ahI6rjcZSHPrIJsMoE95hy2LB2tcUznhskAhxzqy9qVExzdb7nTB0qleORSCCqLWUQjSMcWYN7SGV8UqVYbyHr8xhekKtDP0kB31SUDFAWkIxxLLu7J-lFpradI"
                />
            </div>
            <div className="flex-grow w-full md:w-auto text-center md:text-left flex flex-col justify-center h-32 md:h-40">
                {isEditMode ? (
                    <input
                        type="text"
                        value={characterData.name}
                        onChange={(e) => updateName(e.target.value)}
                        className="text-4xl md:text-5xl font-bold tracking-wide text-white mb-1 uppercase text-glow-pink font-display bg-transparent border-b border-white/20 focus:border-cyber-pink outline-none w-full text-center md:text-left"
                        placeholder="Nome do Personagem"
                    />
                ) : (
                    <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-white mb-1 uppercase text-glow-pink font-display">{characterData.name}</h1>
                )}

                <div className="text-cyber-gray text-lg font-medium tracking-widest uppercase mb-4 flex items-center justify-center md:justify-start gap-2">
                    Nível
                    {isEditMode ? (
                        <input
                            type="number"
                            value={characterData.level}
                            onChange={(e) => updateLevel(e.target.value)}
                            className="bg-transparent border-b border-white/20 focus:border-cyber-pink outline-none w-16 text-center text-white"
                            min="1"
                        />
                    ) : (
                        <span className="text-white">{characterData.level}</span>
                    )}
                </div>
                <div className="w-full max-w-md mx-auto md:mx-0">
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-yellow shadow-[0_0_10px_#ff007f] transition-all duration-500"
                            style={{ width: `${Math.min(100, Math.max(0, (characterData.xp / characterData.nextLevel) * 100))}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-cyber-gray mt-1 font-mono">
                        {isEditMode ? (
                            <>
                                <div className="flex items-center gap-1">
                                    XP:
                                    <input
                                        type="number"
                                        value={characterData.xp}
                                        onChange={(e) => updateXp(e.target.value)}
                                        className="bg-transparent border-b border-white/20 focus:border-cyber-pink outline-none w-16 text-xs text-cyber-gray"
                                    />
                                </div>
                                <div className="flex items-center gap-1">
                                    Próximo Nível:
                                    <input
                                        type="number"
                                        value={characterData.nextLevel}
                                        onChange={(e) => updateNextLevel(e.target.value)}
                                        className="bg-transparent border-b border-white/20 focus:border-cyber-pink outline-none w-16 text-xs text-cyber-gray text-right"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <span>XP: {characterData.xp}</span>
                                <span>Próximo Nível: {characterData.nextLevel}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
