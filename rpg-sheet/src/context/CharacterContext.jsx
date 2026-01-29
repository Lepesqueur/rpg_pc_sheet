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
    // Inicializar estado com dados das regras
    const [characterData, setCharacterData] = useState(() => {
        // Tentar carregar do LocalStorage
        const saved = localStorage.getItem('aeliana_character_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse saved character data", e);
            }
        }

        return {
            attributes: ATTRIBUTES,
            skillCategories: SKILLS_CATEGORIES,
            vitality: { current: 80, max: 100 },
            focus: { current: 45, max: 50 },
            will: { current: 28, max: 40 }
        };
    });

    // Salvar no LocalStorage sempre que houver mudança
    useEffect(() => {
        localStorage.setItem('aeliana_character_data', JSON.stringify(characterData));
    }, [characterData]);

    const updateSkillLevel = (categoryKey, skillName, newLevel) => {
        setCharacterData(prev => {
            const updatedCategories = { ...prev.skillCategories };
            const category = { ...updatedCategories[categoryKey] };
            const updatedSkills = category.skills.map(skill => {
                if (skill.name === skillName) {
                    // Se clicar no nível atual, volta para o anterior (toggle)
                    // Ou se for clicar no nível 1 sendo 1, vira 0.
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
        updateSkillLevel
    };

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
};
