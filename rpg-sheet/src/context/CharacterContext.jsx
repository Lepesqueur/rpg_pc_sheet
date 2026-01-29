import React, { createContext, useContext, useState, useEffect } from 'react';
import { ATTRIBUTES, SKILLS_CATEGORIES } from '../data/rules';

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
            vitality: { current: 80, max: 100 },
            focus: { current: 45, max: 50 },
            will: { current: 28, max: 40 },
            defenses: {
                fortitude: 16,
                reflex: 18,
                tenacity: 14
            }
        };

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
                    will: { ...defaultData.will, ...(parsed.will || {}) }
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

    const value = {
        characterData,
        isEditMode,
        toggleEditMode,
        updateAttribute,
        updateDefense,
        updateStatusMax,
        updateStatus,
        updateSkillLevel
    };

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
};
