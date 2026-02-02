export const COMPENDIUM = {
    items: [
        { name: "Poção de Cura Maior", icon: "fa-flask-vial", color: "text-rpg-pink", qty: 1, currentUses: 1, maxUses: 1, type: "Consumível", price: "50 po", weight: 0.5, description: "Recupera 2d8+4 de Vitalidade." },
        { name: "Lanterna a Óleo", icon: "fa-fire-burner", color: "text-rpg-gold", qty: 1, currentUses: 6, maxUses: 6, type: "Item", price: "5 po", weight: 1.0, description: "Fornece luz em um raio de 9 metros." },
        { name: "Rações de Viagem (5 dias)", icon: "fa-wheat-awn", color: "text-rpg-gold", qty: 5, currentUses: 0, maxUses: 0, type: "Consumível", price: "2 po", weight: 2.5, description: "Suficiente para um dia de nutrição." },
        { name: "Manta Élfica", icon: "fa-vest", color: "text-rpg-gold", qty: 1, currentUses: 0, maxUses: 0, type: "Item", price: "100 po", weight: 0.5, description: "Vantagem em testes de Furtividade." }
    ],
    talents: [
        {
            name: "ATAQUE GIRATÓRIO",
            category: "actions",
            tags: ["Habilidade Ativa", "Marcial"],
            pa: 3,
            costs: { focus: 0, will: 0, vitality: 4 },
            stats: {
                duracao: "Instantânea",
                ativacao: "Ação",
                alcance: "Adjacente",
                alvo: "Todos os inimigos"
            },
            description: "Realiza um ataque contra todos os inimigos adjacentes.",
            fullDescription: "O guerreiro gira seu tronco com força bruta, atingindo todos ao seu redor em um único movimento fluido. Requer uma arma de combate corpo a corpo.",
            potencializacoes: [
                { name: "+1d6 de Dano", effect: "Aumenta a força centrífuga", resource: "vitality", value: 2 },
                { name: "Empurrar 1.5m", effect: "Afasta os inimigos atingidos", resource: "focus", value: 1 }
            ],
            icon: "fa-arrows-spin",
            color: "neon-blue"
        },
        {
            name: "VONTADE INDOMÁVEL",
            category: "talent",
            tags: ["Passiva"],
            pa: 0,
            costs: { focus: 0, will: 0, vitality: 0 },
            stats: {
                duracao: "Passiva",
                ativacao: "Passiva",
                alcance: "-",
                alvo: "Pessoal"
            },
            description: "Sempre que estiver com menos de 25% de Vitalidade, ganha +2 em todas as defesas.",
            fullDescription: "Sua determinação brilha mais forte quando você está à beira da derrota.",
            potencializacoes: [],
            icon: "fa-shield-heart",
            color: "neon-yellow"
        }
    ],
    peculiarities: [
        { name: "Código de Honra", val: "-", description: "Nunca recusa um desafio ou ataca um inimigo desarmado." },
        { name: "Voz de Comando", val: "+2", description: "Bônus em testes de Diplomacia e Intimidação durante combate." },
        { name: "Sono Leve", val: "-", description: "O personagem acorda ao menor ruído suspeito." }
    ],
    bundles: [
        {
            name: "Kit de Explorador",
            description: "Equipamentos essenciais para quem vive na estrada.",
            items: [
                { name: "Lanterna a Óleo", icon: "fa-fire-burner", color: "text-rpg-gold", qty: 1, currentUses: 6, maxUses: 6, type: "Item", price: "5 po", weight: 1.0 },
                { name: "Rações de Viagem (5 dias)", icon: "fa-wheat-awn", color: "text-rpg-gold", qty: 5, currentUses: 0, maxUses: 0, type: "Consumível", price: "2 po", weight: 2.5 },
                { name: "Corda de Cânhamo", icon: "fa-dharmachakra", color: "text-rpg-gold", qty: 1, currentUses: 0, maxUses: 0, type: "Item", price: "2 po", weight: 2.0 }
            ],
            talents: [],
            peculiarities: [
                { name: "Sono Leve", val: "-", description: "O personagem acorda ao menor ruído suspeito." }
            ]
        },
        {
            name: "Senda do Guerreiro",
            description: "Talento e equipamentos para o combate frontal.",
            items: [
                { name: "Poção de Cura", icon: "fa-flask", color: "text-rpg-pink", qty: 1, currentUses: 1, maxUses: 1, type: "Consumível", price: "5 po", weight: 0.5 }
            ],
            talents: [
                {
                    name: "ATAQUE GIRATÓRIO",
                    category: "actions",
                    tags: ["Habilidade Ativa", "Marcial"],
                    pa: 3,
                    costs: { focus: 0, will: 0, vitality: 4 },
                    stats: { duracao: "Instantânea", ativacao: "Ação", alcance: "Adjacente", alvo: "Todos os inimigos" },
                    description: "Realiza um ataque contra todos os inimigos adjacentes.",
                    fullDescription: "Giro mortal com arma.",
                    potencializacoes: [],
                    icon: "fa-arrows-spin",
                    color: "neon-blue"
                }
            ],
            peculiarities: [
                { name: "Voz de Comando", val: "+2", description: "Bônus em testes sociais em combate." }
            ]
        }
    ]
};
