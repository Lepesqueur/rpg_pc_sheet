import React from 'react';
import { ATTRIBUTES } from '../data/rules';

const StatsGrid = () => (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {ATTRIBUTES.map((attr) => (
            <div key={attr.name} className={`glass-card rounded-xl p-4 flex flex-col items-center justify-center border-t-2 border-t-${attr.color}/50`}>
                <i className={`fa-solid ${attr.icon} text-2xl text-${attr.color} mb-2`}></i>
                <span className="text-xs text-cyber-gray tracking-wider mb-1 uppercase text-center font-bold">
                    {attr.name} <br />
                    <span className="text-[10px] opacity-70">({attr.label})</span>
                </span>
                <span className="font-bold text-white text-4xl">{attr.value}</span>
            </div>
        ))}
    </section>
);

export default StatsGrid;
