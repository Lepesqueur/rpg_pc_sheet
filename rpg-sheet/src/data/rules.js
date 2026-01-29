export const ATTRIBUTES = [
    { name: 'Tamanho', label: 'Tam', icon: 'fa-mountain', color: 'cyber-yellow', value: 12 },
    { name: 'Vigor', label: 'Vig', icon: 'fa-heart', color: 'cyber-pink', value: 16 },
    { name: 'Destreza', label: 'Des', icon: 'fa-location-arrow', color: 'cyber-purple', value: 18 },
    { name: 'Intelecto', label: 'Int', icon: 'fa-brain', color: 'cyber-purple', value: 20 },
    { name: 'Intuição', label: 'Intu', icon: 'fa-eye', color: 'cyber-pink', value: 15 },
    { name: 'Presença', label: 'Pres', icon: 'fa-star', color: 'cyber-yellow', value: 14 },
];

export const SKILLS_CATEGORIES = {
    weapons: {
        label: 'Armas',
        icon: 'fa-crosshairs',
        color: '#ff00ff',
        borderColor: '#f1c40f',
        skills: [
            { name: 'Arqueirismo', attr: 'DES', level: 3, icon: 'fa-bow-arrow' },
            { name: 'Atirar', attr: ['DES', 'INTUI'], level: 2, icon: 'fa-bullseye' },
            { name: 'Haste', attr: ['DES', 'VIG'], level: 1, icon: 'fa-staff-snake' },
            { name: 'Lâminas', attr: ['TAM', 'DES'], level: 3, icon: 'fa-khanda' },
            { name: 'Pesadas', attr: ['TAM', 'VIG'], level: 0, icon: 'fa-hammer' },
            { name: 'Rápidas', attr: 'DES', level: 2, icon: 'fa-bolt' },
        ]
    },
    tech: {
        label: 'Técnicas',
        icon: 'fa-microchip',
        color: '#ff00ff',
        borderColor: '#00e5ff',
        skills: [
            { name: 'Aparatos', attr: ['DES', 'INT'], level: 1, icon: 'fa-toolbox' },
            { name: 'Arremesso', attr: ['TAM', 'DES'], level: 2, icon: 'fa-bullseye' },
            { name: 'Atletismo', attr: ['VIG', 'DES'], level: 3, icon: 'fa-person-running' },
            { name: 'Furtividade', attr: 'DES', level: 2, icon: 'fa-user-ninja' },
            { name: 'Luta', attr: ['TAM', 'DES'], level: 1, icon: 'fa-hand-fist' },
            { name: 'Prestidigitação', attr: 'DES', level: 1, icon: 'fa-wand-sparkles' },
        ]
    },
    knowledge: {
        label: 'Conhecimentos',
        icon: 'fa-book',
        color: '#ff00ff',
        borderColor: '#9b59b6',
        skills: [
            { name: 'Alquimia', attr: 'INT', level: 2, icon: 'fa-flask' },
            { name: 'Arcana', attr: 'INT', level: 3, icon: 'fa-hat-wizard' },
            { name: 'Escotismo', attr: ['INT', 'INTUI'], level: 1, icon: 'fa-mountain-sun' },
            { name: 'História', attr: 'INT', level: 1, icon: 'fa-scroll' },
            { name: 'Investigação', attr: 'INT', level: 2, icon: 'fa-magnifying-glass' },
            { name: 'Medicina', attr: ['INT', 'INTUI'], level: 1, icon: 'fa-briefcase-medical' },
        ]
    },
    social: {
        label: 'Sociais',
        icon: 'fa-comments',
        color: '#ff00ff',
        borderColor: '#ff00ff',
        skills: [
            { name: 'Dissimular', attr: 'PRE', level: 2, icon: 'fa-mask' },
            { name: 'Empatia Feral', attr: 'INTUI', level: 1, icon: 'fa-paw' },
            { name: 'Inuendo', attr: ['PRE', 'INTUI'], level: 3, icon: 'fa-user-secret' },
            { name: 'Intimidação', attr: ['TAM', 'PRE'], level: 2, icon: 'fa-skull' },
            { name: 'Performance', attr: 'PRE', level: 1, icon: 'fa-masks-theater' },
            { name: 'Persuasão', attr: 'PRE', level: 3, icon: 'fa-handshake' },
        ]
    }
};
