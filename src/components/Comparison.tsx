import React, { useState, useMemo } from 'react';
import InvestmentForm, { InvestmentFormState } from './InvestmentForm';
import { calculateFutureValue, CalculationResult } from '../lib/investmentCalculations';
import { formatCurrency } from '../lib/utils';
import ComparisonChart from './ComparisonChart';
import { ArrowRight } from 'lucide-react';

const Comparison: React.FC = () => {
  const [scenarioA, setScenarioA] = useState<InvestmentFormState>({
    lumpsum: 50000,
    monthlyInvestment: 10000,
    stepUp: 10,
    returnRate: 12,
    timePeriod: 10,
  });

  const [scenarioB, setScenarioB] = useState<InvestmentFormState>({
    lumpsum: 50000,
    monthlyInvestment: 15000,
    stepUp: 10,
    returnRate: 12,
    timePeriod: 10,
  });

  const resultA = useMemo(() => calculateFutureValue(scenarioA), [scenarioA]);
  const resultB = useMemo(() => calculateFutureValue(scenarioB), [scenarioB]);

  const handleStateChangeA = (newState: Partial<InvestmentFormState>) => {
    setScenarioA(prevState => ({ ...prevState, ...newState }));
  };

  const handleStateChangeB = (newState: Partial<InvestmentFormState>) => {
    setScenarioB(prevState => ({ ...prevState, ...newState }));
  };

  const ResultCard = ({ title, result, color }: { title: string; result: CalculationResult; color: string }) => (
    <div className={`bg-white p-6 rounded-xl border border-slate-200`}>
      <h3 className={`text-xl font-bold text-${color}-800 mb-4`}>{title}</h3>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-500">Total Value</span>
          <span className={`font-bold text-lg text-${color}-700`}>{formatCurrency(result.totalValue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Total Invested</span>
          <span className="font-semibold text-slate-600">{formatCurrency(result.totalInvested)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Est. Returns</span>
          <span className="font-semibold text-emerald-600">{formatCurrency(result.estimatedReturns)}</span>
        </div>
      </div>
    </div>
  );

  const valueDiff = resultB.totalValue - resultA.totalValue;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Scenario Comparison</h2>
        <p className="mt-2 text-slate-500 max-w-2xl mx-auto">Adjust the parameters for two different scenarios to see how small changes can impact your long-term wealth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Scenario A</h3>
          <InvestmentForm state={scenarioA} onStateChange={handleStateChangeA} />
        </div>
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg shadow-brand-200/50 border border-brand-200">
          <h3 className="text-2xl font-bold text-brand-800 mb-6">Scenario B</h3>
          <InvestmentForm state={scenarioB} onStateChange={handleStateChangeB} />
        </div>
      </div>

      <div className="bg-slate-50/80 p-8 rounded-2xl">
        <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Comparison Results</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center mb-8">
          <ResultCard title="Scenario A" result={resultA} color="slate" />
          
          <div className="text-center hidden lg:block">
            <p className="text-slate-500 text-sm">Difference</p>
            <p className={`text-2xl font-bold ${valueDiff >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {valueDiff >= 0 ? '+' : ''}{formatCurrency(valueDiff)}
            </p>
            <ArrowRight className="w-12 h-12 text-slate-300 mx-auto mt-2" />
          </div>

          <ResultCard title="Scenario B" result={resultB} color="brand" />
        </div>
        
        <ComparisonChart resultA={resultA} resultB={resultB} />
      </div>
    </div>
  );
};

export default Comparison;
