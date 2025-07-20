import React, { useState } from 'react';
import Header from './components/Header';
import SipCalculator from './components/SipCalculator';
import GoalPlanner from './components/GoalPlanner';
import Comparison from './components/Comparison';
import CalculatorTabs, { CalculatorMode } from './components/CalculatorTabs';

function App() {
  const [mode, setMode] = useState<CalculatorMode>('growth');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main>
        <div className="container mx-auto px-4 pt-8">
          <div className="max-w-sm mx-auto">
            <CalculatorTabs activeMode={mode} onModeChange={setMode} />
          </div>
        </div>
        
        {mode === 'growth' && <SipCalculator />}
        {mode === 'goal' && <GoalPlanner />}
        {mode === 'compare' && <Comparison />}

      </main>
      <footer className="text-center py-8">
        <p className="text-slate-500 text-sm">
          Created with ❤️ by <a href="https://github.com/Akshay-Sharma-1" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600 hover:text-brand-700">Akkay</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
