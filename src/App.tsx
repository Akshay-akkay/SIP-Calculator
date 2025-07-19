import React from 'react';
import Header from './components/Header';
import SipCalculator from './components/SipCalculator';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      <main>
        <SipCalculator />
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
