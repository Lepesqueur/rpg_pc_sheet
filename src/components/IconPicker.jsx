import React, { useState } from 'react';
import { Modal } from './Modal';

// Curated list of FontAwesome icons suitable for RPGs
const RPG_ICONS = [
    // Magia e Energia
    { name: 'fa-burst', tags: ['magia', 'energia', 'explosao'] },
    { name: 'fa-fire', tags: ['magia', 'fogo', 'elemento'] },
    { name: 'fa-bolt', tags: ['magia', 'raio', 'energia'] },
    { name: 'fa-bolt-lightning', tags: ['magia', 'raio', 'tempestade'] },
    { name: 'fa-droplet', tags: ['magia', 'agua', 'elemento'] },
    { name: 'fa-wind', tags: ['magia', 'vento', 'elemento', 'ar'] },
    { name: 'fa-snowflake', tags: ['magia', 'gelo', 'elemento', 'frio'] },
    { name: 'fa-wand-magic-sparkles', tags: ['magia', 'arcano', 'feitico'] },
    { name: 'fa-wand-sparkles', tags: ['magia', 'prestidigitacao', 'encanto'] },
    { name: 'fa-hat-wizard', tags: ['magia', 'mago', 'chapeu'] },
    { name: 'fa-hand-sparkles', tags: ['magia', 'cura', 'divino', 'bencao'] },
    { name: 'fa-sparkles', tags: ['magia', 'brilho', 'luz'] },
    { name: 'fa-sun', tags: ['magia', 'luz', 'sol', 'radiante'] },
    { name: 'fa-moon', tags: ['magia', 'noite', 'lua', 'escuridao'] },
    { name: 'fa-skull', tags: ['necromancia', 'morte', 'caveira'] },
    { name: 'fa-ghost', tags: ['espiritual', 'fantasma', 'intangivel'] },
    { name: 'fa-eye', tags: ['magia', 'visao', 'percepcao', 'olho'] },

    // Combate e Armas
    { name: 'fa-khanda', tags: ['arma', 'espada', 'combate'] },
    { name: 'fa-sword', tags: ['arma', 'espada', 'lamina'] },
    { name: 'fa-gavel', tags: ['arma', 'martelo', 'combate', 'juiz'] },
    { name: 'fa-hammer', tags: ['arma', 'martelo', 'ferramenta'] },
    { name: 'fa-axe', tags: ['arma', 'machado', 'combate'] },
    { name: 'fa-axe-battle', tags: ['arma', 'machado', 'combate', 'guerra'] },
    { name: 'fa-shield-halved', tags: ['defesa', 'escudo', 'protecao'] },
    { name: 'fa-shield-heart', tags: ['defesa', 'protecao', 'vida'] },
    { name: 'fa-bow-arrow', tags: ['arma', 'arco', 'distancia'] },
    { name: 'fa-location-arrow', tags: ['arma', 'seta', 'flecha'] },
    { name: 'fa-crosshairs', tags: ['arma', 'mira', 'atirar'] },
    { name: 'fa-gun', tags: ['arma', 'fogo', 'pistola'] },
    { name: 'fa-fist-raised', tags: ['combate', 'punho', 'luta', 'forca'] },
    { name: 'fa-hand-fist', tags: ['combate', 'punho', 'desarmado'] },
    { name: 'fa-bomb', tags: ['arma', 'explosivo', 'bomba'] },
    { name: 'fa-staff-snake', tags: ['arma', 'cajado', 'magia', 'haste'] },

    // Status e Condições
    { name: 'fa-heart', tags: ['status', 'vida', 'cura'] },
    { name: 'fa-heart-pulse', tags: ['status', 'vida', 'batimento'] },
    { name: 'fa-heart-crack', tags: ['status', 'vida', 'ferida', 'fraqueza'] },
    { name: 'fa-face-frown', tags: ['condicao', 'triste', 'abatido'] },
    { name: 'fa-face-grin-stars', tags: ['condicao', 'feliz', 'motivado'] },
    { name: 'fa-brain', tags: ['mental', 'intelecto', 'psiquico'] },
    { name: 'fa-person-running', tags: ['movimento', 'velocidade', 'agilidade'] },
    { name: 'fa-person-falling', tags: ['condicao', 'caido', 'dano'] },
    { name: 'fa-eye-slash', tags: ['sentidos', 'cego', 'furtividade'] },
    { name: 'fa-ear-listen', tags: ['sentidos', 'percepcao', 'audicao'] },
    { name: 'fa-biohazard', tags: ['saude', 'veneno', 'toxico'] },
    { name: 'fa-bandage', tags: ['saude', 'cura', 'primeiros-socorros'] },

    // Roupas e Armaduras
    { name: 'fa-shirt', tags: ['item', 'roupa', 'armadura', 'tronco'] },
    { name: 'fa-vest', tags: ['item', 'roupa', 'colete', 'armadura'] },
    { name: 'fa-helmet-safety', tags: ['item', 'capacete', 'cabeca', 'protecao'] },
    { name: 'fa-user-shield', tags: ['item', 'escudo', 'protecao', 'defesa'] },
    { name: 'fa-glasses', tags: ['item', 'oculos', 'percepcao'] },
    { name: 'fa-mitten', tags: ['item', 'luvas', 'maos'] },
    { name: 'fa-shoe-prints', tags: ['item', 'botas', 'pes', 'pernas'] },
    { name: 'fa-mask', tags: ['item', 'mascara', 'rosto', 'furtividade'] },
    { name: 'fa-tshirt', tags: ['item', 'camisa', 'roupa', 'casual'] },

    // Utilitários e Sobrevivência
    { name: 'fa-key', tags: ['utilitario', 'chave', 'fechadura'] },
    { name: 'fa-lock', tags: ['utilitario', 'cadeado', 'trancado'] },
    { name: 'fa-lock-open', tags: ['utilitario', 'aberto', 'desbloqueado'] },
    { name: 'fa-compass', tags: ['utilitario', 'navegacao', 'direcao'] },
    { name: 'fa-map', tags: ['utilitario', 'mapa', 'viagem'] },
    { name: 'fa-binoculars', tags: ['utilitario', 'observacao', 'longe'] },
    { name: 'fa-magnifying-glass', tags: ['utilitario', 'investigacao', 'procurar'] },
    { name: 'fa-fire-burner', tags: ['utilitario', 'lanterna', 'fogo'] },
    { name: 'fa-tent', tags: ['sobrevivencia', 'acampamento', 'descanso'] },
    { name: 'fa-backpack', tags: ['item', 'mochila', 'inventario'] },
    { name: 'fa-box', tags: ['item', 'caixa', 'recipiente'] },
    { name: 'fa-box-open', tags: ['item', 'caixa', 'aberta'] },
    { name: 'fa-suitcase', tags: ['item', 'mala', 'viagem'] },
    { name: 'fa-flask', tags: ['item', 'pocao', 'alquimia'] },
    { name: 'fa-flask-vial', tags: ['utilitario', 'experimento', 'alquimia'] },
    { name: 'fa-scroll', tags: ['item', 'pergaminho', 'magia'] },
    { name: 'fa-book', tags: ['item', 'livro', 'leitura'] },
    { name: 'fa-book-open', tags: ['conhecimento', 'estudo', 'leitura'] },
    { name: 'fa-feather', tags: ['item', 'pena', 'escrita', 'leve'] },
    { name: 'fa-pen-nib', tags: ['escrita', 'tinta', 'contrato'] },
    { name: 'fa-bone', tags: ['item', 'osso', 'necromancia'] },

    // Comida e Bebida
    { name: 'fa-drumstick-bite', tags: ['item', 'comida', 'carne', 'recuperacao'] },
    { name: 'fa-bread-slice', tags: ['item', 'comida', 'pao', 'raçao'] },
    { name: 'fa-apple-whole', tags: ['item', 'comida', 'fruta', 'saude'] },
    { name: 'fa-wine-bottle', tags: ['item', 'bebida', 'vinho'] },
    { name: 'fa-beer-mug-empty', tags: ['item', 'bebida', 'caneca'] },
    { name: 'fa-fish', tags: ['item', 'comida', 'peixe', 'pesca'] },

    // Valiosos e Loot
    { name: 'fa-gem', tags: ['item', 'tesouro', 'joia', 'rubi'] },
    { name: 'fa-coins', tags: ['item', 'dinheiro', 'ouro', 'riqueza'] },
    { name: 'fa-sack-dollar', tags: ['item', 'dinheiro', 'saco'] },
    { name: 'fa-trophy', tags: ['item', 'conquista', 'ouro', 'vitoria'] },
    { name: 'fa-medal', tags: ['talento', 'conquista', 'honra'] },
    { name: 'fa-award', tags: ['conquista', 'premio'] },

    // Natureza e Animais
    { name: 'fa-mountain', tags: ['ambiente', 'terreno', 'montanha'] },
    { name: 'fa-mountain-sun', tags: ['natureza', 'viagem', 'dia'] },
    { name: 'fa-tree', tags: ['ambiente', 'natureza', 'arvore'] },
    { name: 'fa-leaf', tags: ['natureza', 'folha', 'planta'] },
    { name: 'fa-seedling', tags: ['natureza', 'semente', 'broto'] },
    { name: 'fa-water', tags: ['natureza', 'agua', 'rio'] },
    { name: 'fa-paw', tags: ['animal', 'pegada', 'bestia'] },
    { name: 'fa-dragon', tags: ['animal', 'dragao', 'poder'] },
    { name: 'fa-horse', tags: ['animal', 'cavalo', 'montaria'] },
    { name: 'fa-fish-fins', tags: ['animal', 'peixe', 'mar'] },
    { name: 'fa-spider', tags: ['animal', 'aranha', 'teia'] },
    { name: 'fa-snake', tags: ['animal', 'cobra', 'veneno'] },
    { name: 'fa-bug', tags: ['animal', 'inseto', 'praga'] },
    { name: 'fa-dove', tags: ['animal', 'pomba', 'paz'] },
    { name: 'fa-crow', tags: ['animal', 'corvo', 'misterio'] },

    // Gaming e Meta
    { name: 'fa-dice', tags: ['jogo', 'dado', 'sorte'] },
    { name: 'fa-dice-d20', tags: ['jogo', 'dado', 'rpg'] },
    { name: 'fa-dice-d6', tags: ['jogo', 'dado', 'comum'] },
    { name: 'fa-gamepad', tags: ['jogo', 'controle', 'diversao'] },
    { name: 'fa-chess', tags: ['jogo', 'estrategia', 'tabuleiro'] },
    { name: 'fa-chess-knight', tags: ['jogo', 'estrategia', 'cavaleiro'] },
    { name: 'fa-puzzle-piece', tags: ['jogo', 'enigma', 'peca'] },
    { name: 'fa-lightbulb', tags: ['talento', 'ideia', 'inteligencia'] },
    { name: 'fa-star', tags: ['talento', 'passiva', 'bonus'] },
    { name: 'fa-crown', tags: ['talento', 'lideranca', 'realeza'] },
];

const IconPicker = ({ isOpen, onClose, onSelect, currentIcon }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filteredIcons = RPG_ICONS.filter(icon =>
        icon.name.includes(searchTerm.toLowerCase()) ||
        icon.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl">
            <div className="bg-zinc-950/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">Selecionar Ícone</h3>
                        <p className="text-xs text-slate-400 mt-1">Escolha um ícone para sua habilidade ou talento.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400 hover:text-white">
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 pb-2">
                    <div className="relative">
                        <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                        <input
                            type="text"
                            placeholder="Buscar ícone (ex: fogo, espada, vida)..."
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyber-pink transition-colors font-sans"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
                    {filteredIcons.length > 0 ? (
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {filteredIcons.map((icon) => (
                                <button
                                    key={icon.name}
                                    onClick={() => { onSelect(icon.name); onClose(); }}
                                    className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 border transition-all hover:scale-105 active:scale-95 ${currentIcon === icon.name
                                        ? 'bg-cyber-pink/20 border-cyber-pink text-cyber-pink shadow-[0_0_15px_rgba(255,0,153,0.3)]'
                                        : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white hover:border-white/20'
                                        }`}
                                    title={icon.tags.join(', ')}
                                >
                                    <i className={`fa-solid ${icon.name} text-2xl`}></i>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                            <i className="fa-solid fa-ghost text-4xl mb-4 opacity-50"></i>
                            <p>Nenhum ícone encontrado para "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default IconPicker;
