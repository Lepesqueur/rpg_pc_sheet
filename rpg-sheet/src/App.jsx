import React, { useState } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import Navigation from './components/Navigation';
import AttributesTab from './tabs/AttributesTab';
import CombatTab from './tabs/CombatTab';

const SkillsTab = () => <div className="p-12 text-center text-cyber-gray glass-card rounded-xl">Aba de Habilidades em breve...</div>;
const InventoryTab = () => <div className="p-12 text-center text-cyber-gray glass-card rounded-xl">Aba de Inventário em breve...</div>;

function App() {
  const [activeTab, setActiveTab] = useState('attributes');

  const renderTab = () => {
    switch (activeTab) {
      case 'attributes': return <AttributesTab />;
      case 'combat': return <CombatTab />;
      case 'skills': return <SkillsTab />;
      case 'inventory': return <InventoryTab />;
      default: return <AttributesTab />;
    }
  };

  return (
    <div className="bg-scanline min-h-screen selection:bg-cyber-pink selection:text-white pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <Header />
        <StatsGrid />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="min-h-[500px]">
          {renderTab()}
        </div>

        <footer className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-cyber-gray opacity-50 uppercase tracking-[0.5em]">SYSTEM VERSION 3.0.0 // REACT MIGRATION PRTCL</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
