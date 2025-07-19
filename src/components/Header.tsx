import { Calculator } from 'lucide-react';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-50/80 backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-brand-600 text-white p-2 rounded-lg">
              <Calculator size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              SIP Calculator
            </h1>
          </div>
          <a
            href="https://github.com/Akshay-Sharma-1/Akkay"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Get Akkay
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
