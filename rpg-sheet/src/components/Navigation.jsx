import React from 'react';

const Navigation = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'attributes', label: 'ATRIBUTOS & PERÍCIAS' },
        { id: 'combat', label: 'COMBATE & DEFESA' },
        { id: 'skills', label: 'HABILIDADES & TALENTOS' },
        { id: 'inventory', label: 'INVENTÁRIO & NOTAS' },
    ];

    return (
        <nav className="flex overflow-x-auto border-b border-white/10 pb-1 space-x-8 mb-6 scrollbar-hide">
            {tabs.map((tab) => (
                <a
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`cursor-pointer px-2 py-3 text-sm font-semibold transition-colors whitespace-nowrap relative ${activeTab === tab.id ? 'text-white border-b-2 border-cyber-pink' : 'text-gray-400 hover:text-white'
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-pink to-transparent"></span>
                    )}
                </a>
            ))}
        </nav>
    );
};

export default Navigation;
