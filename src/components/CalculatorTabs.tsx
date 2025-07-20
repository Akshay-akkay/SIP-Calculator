import React from 'react';
import { TrendingUp, Target, Columns } from 'lucide-react';

export type CalculatorMode = 'growth' | 'goal' | 'compare';

interface CalculatorTabsProps {
  activeMode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

const CalculatorTabs: React.FC<CalculatorTabsProps> = ({ activeMode, onModeChange }) => {
  const tabs = [
    { id: 'growth', label: 'Growth', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'goal', label: 'Goal', icon: <Target className="w-5 h-5" /> },
    { id: 'compare', label: 'Compare', icon: <Columns className="w-5 h-5" /> },
  ];

  return (
    <div className="p-1 bg-slate-200/80 rounded-xl flex items-center space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onModeChange(tab.id as CalculatorMode)}
          className={`w-full px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2
            ${activeMode === tab.id 
              ? 'bg-white text-brand-700 shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100/50'
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CalculatorTabs;
