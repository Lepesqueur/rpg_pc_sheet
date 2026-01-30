import React, { createContext, useContext, useState, useEffect } from 'react';
import { ATTRIBUTES, SKILLS_CATEGORIES, DAMAGE_RESISTANCES, CONDITIONS } from '../data/rules';

const CharacterContext = createContext();

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacter must be used within a CharacterProvider');
    }
    return context;
};

export const CharacterProvider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    // Inicializar estado com dados das regras
    const [characterData, setCharacterData] = useState(() => {
        const defaultData = {
            attributes: ATTRIBUTES,
            skillCategories: SKILLS_CATEGORIES,
            vitality: { current: 80, max: 100, level: 0 },
            focus: { current: 45, max: 50, level: 0 },
            will: { current: 28, max: 40, level: 0 },
            defenses: {
                fortitude: 16,
                reflex: 18,
                tenacity: 14
            },
            attacks: [
                { id: '1', name: 'Espada Longa', ap: 3, resource: { type: 'vitality', value: 2 }, damage: '2d8+4', range: 'C.C.', wear: 0, skill: 'Lâminas', properties: 'Versátil', damageType: 'corte' },
                { id: '2', name: 'Arco Curto', ap: 4, resource: { type: 'focus', value: 5 }, damage: '1d6+3', range: '18m', wear: 0, skill: 'Arqueirismo', properties: '', damageType: 'perfuracao' }
            ],
            armors: [
                { id: 'a1', name: 'Colete de Kevlar', icon: 'fa-shield-halved', current: 4, max: 4, notes: '', reflexBonus: 0, properties: 'Leve' },
                { id: 'a2', name: 'Elmo Neural', icon: 'fa-mask', current: 2, max: 2, notes: '', reflexBonus: 1, properties: '' }
            ],
            resistances: {}, // Will be populated below
            conditions: {} // Will be populated below
        };

        // Populate initial conditions from rules
        Object.values(CONDITIONS).forEach(category => {
            category.items.forEach(item => {
                defaultData.conditions[item.key] = { active: false, level: 1 };
            });
        });

        // Populate initial resistances from rules
        Object.values(DAMAGE_RESISTANCES).forEach(category => {
            category.types.forEach(type => {
                defaultData.resistances[type.key] = { value: 0, immunity: false, vulnerable: false };
            });
        });

        // Add some default resistances for testing
        defaultData.resistances.fogo = { value: 10, immunity: false, vulnerable: false };
        defaultData.resistances.impacto = { value: 5, immunity: false, vulnerable: false };
        defaultData.resistances.eletrico = { value: 0, immunity: false, vulnerable: true };
        defaultData.resistances.veneno = { value: 0, immunity: true, vulnerable: false };

        const saved = localStorage.getItem('aeliana_character_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);

                // Merge robusto: garante que novas chaves (como 'defenses') existam
                const merged = {
                    ...defaultData,
                    ...parsed,
                    // Garante que sub-objetos também existam se o save for antigo
                    defenses: { ...defaultData.defenses, ...(parsed.defenses || {}) },
                    vitality: { ...defaultData.vitality, ...(parsed.vitality || {}) },
                    focus: { ...defaultData.focus, ...(parsed.focus || {}) },
                    will: { ...defaultData.will, ...(parsed.will || {}) },
                    attacks: (parsed.attacks || defaultData.attacks).map(attack => {
                        if (attack.costs && !attack.resource) {
                            const type = attack.costs.focus > 0 ? 'focus' : (attack.costs.will > 0 ? 'will' : 'vitality');
                            const value = attack.costs[type] || 0;
                            const { costs, ...rest } = attack;
                            return { ...rest, resource: { type, value } };
                        }
                        return {
                            resource: { type: 'vitality', value: 0 },
                            skill: 'Luta', // Default generic skill
                            properties: '', // Default empty properties
                            damageType: 'impacto', // Default damage type
                            ...attack
                        };
                    }),
                    armors: (parsed.armors || defaultData.armors).map(armor => ({
                        notes: '',
                        icon: 'fa-shield-halved',
                        reflexBonus: 0,
                        properties: '',
                        ...armor
                    })),
                    resistances: { ...defaultData.resistances, ...(parsed.resistances || {}) },
                    conditions: { ...defaultData.conditions, ...(parsed.conditions || {}) }
                };

                // Sincronizar ícones e atributos das regras (para garantir que fix de UI se propaguem)
                Object.keys(SKILLS_CATEGORIES).forEach(catKey => {
                    if (merged.skillCategories[catKey]) {
                        merged.skillCategories[catKey].skills = merged.skillCategories[catKey].skills.map(skill => {
                            const ruleSkill = SKILLS_CATEGORIES[catKey].skills.find(s => s.name === skill.name);
                            if (ruleSkill) {
                                return {
                                    ...skill,
                                    icon: ruleSkill.icon,
                                    attr: ruleSkill.attr
                                };
                            }
                            return skill;
                        });
                    }
                });

                return merged;
            } catch (e) {
                console.error("Failed to parse saved character data", e);
            }
        }

        return defaultData;
    });

    // Salvar no LocalStorage sempre que houver mudança
    useEffect(() => {
        localStorage.setItem('aeliana_character_data', JSON.stringify(characterData));
    }, [characterData]);

    const toggleEditMode = () => setIsEditMode(prev => !prev);

    const updateAttribute = (name, newValue) => {
        setCharacterData(prev => ({
            ...prev,
            attributes: prev.attributes.map(attr =>
                attr.name === name ? { ...attr, value: parseInt(newValue) || 0 } : attr
            )
        }));
    };

    const updateDefense = (key, newValue) => {
        setCharacterData(prev => ({
            ...prev,
            defenses: {
                ...prev.defenses,
                [key]: parseInt(newValue) || 0
            }
        }));
    };

    const updateStatusMax = (statusKey, newValue) => {
        setCharacterData(prev => ({
            ...prev,
            [statusKey]: {
                ...prev[statusKey],
                max: parseInt(newValue) || 0
            }
        }));
    };

    const updateStatus = (statusKey, deltaOrValue, isDelta = true) => {
        setCharacterData(prev => {
            const currentVal = prev[statusKey].current;
            const maxVal = prev[statusKey].max;
            let newValue = isDelta ? currentVal + deltaOrValue : deltaOrValue;

            // Clamp between 0 and max
            newValue = Math.min(Math.max(0, newValue), maxVal);

            return {
                ...prev,
                [statusKey]: {
                    ...prev[statusKey],
                    current: parseInt(newValue) || 0
                }
            };
        });
    };

    const updateConditionLevel = (statusKey, newLevel) => {
        setCharacterData(prev => ({
            ...prev,
            [statusKey]: {
                ...prev[statusKey],
                level: prev[statusKey].level === newLevel ? newLevel - 1 : newLevel
            }
        }));
    };

    const updateSkillLevel = (categoryKey, skillName, newLevel) => {
        if (!isEditMode) return; // Só permite se o modo de edição estiver ligado

        setCharacterData(prev => {
            const updatedCategories = { ...prev.skillCategories };
            const category = { ...updatedCategories[categoryKey] };
            const updatedSkills = category.skills.map(skill => {
                if (skill.name === skillName) {
                    return { ...skill, level: skill.level === newLevel ? newLevel - 1 : newLevel };
                }
                return skill;
            });
            category.skills = updatedSkills;
            updatedCategories[categoryKey] = category;

            return {
                ...prev,
                skillCategories: updatedCategories
            };
        });
    };

    const addAttack = (attack) => {
        setCharacterData(prev => ({
            ...prev,
            attacks: [...(prev.attacks || []), { ...attack, id: Date.now().toString(), wear: 0, damageType: attack.damageType || 'impacto' }]
        }));
    };

    const updateAttack = (id, updatedAttack) => {
        setCharacterData(prev => ({
            ...prev,
            attacks: prev.attacks.map(attack => attack.id === id ? { ...attack, ...updatedAttack } : attack)
        }));
    };

    const deleteAttack = (id) => {
        setCharacterData(prev => ({
            ...prev,
            attacks: prev.attacks.filter(attack => attack.id !== id)
        }));
    };

    const updateAttackWear = (id, level) => {
        setCharacterData(prev => ({
            ...prev,
            attacks: prev.attacks.map(attack => {
                if (attack.id === id) {
                    const newWear = attack.wear === level ? level - 1 : level;
                    return { ...attack, wear: Math.max(0, newWear) };
                }
                return attack;
            })
        }));
    };

    const addArmor = (armor) => {
        setCharacterData(prev => ({
            ...prev,
            armors: [...(prev.armors || []), { ...armor, id: Date.now().toString(), current: armor.max }]
        }));
    };

    const updateArmor = (id, updatedArmor) => {
        setCharacterData(prev => ({
            ...prev,
            armors: prev.armors.map(armor => armor.id === id ? { ...armor, ...updatedArmor } : armor)
        }));
    };

    const deleteArmor = (id) => {
        setCharacterData(prev => ({
            ...prev,
            armors: prev.armors.filter(armor => armor.id !== id)
        }));
    };

    const updateArmorCurrent = (id, newValue) => {
        setCharacterData(prev => ({
            ...prev,
            armors: prev.armors.map(armor => armor.id === id ? { ...armor, current: parseInt(newValue) || 0 } : armor)
        }));
    };

    const updateResistance = (type, field, newValue) => {
        setCharacterData(prev => {
            const currentRes = prev.resistances[type] || { value: 0, immunity: false, vulnerable: false };
            let val = currentRes.value;
            let immunity = currentRes.immunity;
            let vulnerable = currentRes.vulnerable;

            if (field === 'value') {
                // Impede valores negativos e bloqueia se estiver imune
                val = immunity ? 0 : Math.max(0, parseInt(newValue) || 0);
            } else if (field === 'immunity') {
                immunity = newValue;
                // Se ficar imune, desativa vulnerabilidade e zera valor
                if (immunity) {
                    vulnerable = false;
                    val = 0;
                }
            } else if (field === 'vulnerable') {
                vulnerable = newValue;
                // Se ficar vulnerável, desativa imunidade
                if (vulnerable) immunity = false;
            }

            return {
                ...prev,
                resistances: {
                    ...prev.resistances,
                    [type]: { value: val, immunity, vulnerable }
                }
            };
        });
    };
    const updateActiveCondition = (key, field, newValue) => {
        setCharacterData(prev => {
            const currentItem = prev.conditions[key] || { active: false, level: 1 };
            return {
                ...prev,
                conditions: {
                    ...prev.conditions,
                    [key]: {
                        ...currentItem,
                        [field]: field === 'level' ? (parseInt(newValue) || 1) : newValue
                    }
                }
            };
        });
    };
    const updateAllConditions = (newConditions) => {
        setCharacterData(prev => ({
            ...prev,
            conditions: newConditions
        }));
    };

    const value = {
        characterData,
        isEditMode,
        toggleEditMode,
        updateAttribute,
        updateDefense,
        updateStatusMax,
        updateStatus,
        updateConditionLevel,
        updateSkillLevel,
        addAttack,
        updateAttack,
        deleteAttack,
        updateAttackWear,
        addArmor,
        updateArmor,
        deleteArmor,
        updateArmorCurrent,
        updateResistance,
        updateActiveCondition,
        updateAllConditions
    };

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
};
