import React, { useState, useMemo } from 'react';
import { PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import SliderInput from './SliderInput';
import ResultChart from './ResultChart';
import { formatCurrency } from '../lib/utils';

const SipCalculator: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const { totalInvested, estimatedReturns, totalValue } = useMemo(() => {
    const i = returnRate / 12 / 100;
    const n = timePeriod * 12;
    const M = monthlyInvestment;

    if (i === 0) {
      const totalVal = M * n;
      return {
        totalInvested: totalVal,
        estimatedReturns: 0,
        totalValue: totalVal,
      };
    }

    const totalVal = M * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = M * n;
    const returns = totalVal - invested;

    return {
      totalInvested: invested,
      estimatedReturns: returns,
      totalValue: totalVal,
    };
  }, [monthlyInvestment, returnRate, timePeriod]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 p-8 lg:p-10 border-r border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">Plan your Investment</h2>
          <div className="space-y-8">
            <SliderInput
              label="Monthly Investment"
              value={monthlyInvestment}
              onChange={setMonthlyInvestment}
              min={500}
              max={100000}
              step={500}
              format={formatCurrency}
            />
            <SliderInput
              label="Expected Return Rate (p.a.)"
              value={returnRate}
              onChange={setReturnRate}
              min={1}
              max={30}
              step={0.5}
              format={(v) => `${v}%`}
            />
            <SliderInput
              label="Time Period (Years)"
              value={timePeriod}
              onChange={setTimePeriod}
              min={1}
              max={40}
              step={1}
              format={(v) => `${v} Yr`}
            />
          </div>
        </div>
        <div className="lg:col-span-3 p-8 lg:p-10 bg-slate-50/50">
          <div className="flex flex-col h-full">
            <div className="mb-8">
              <p className="text-slate-500">In {timePeriod} years, you will have</p>
              <p className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight animate-fade-in-up" style={{animationDelay: '100ms'}}>
                {formatCurrency(totalValue)}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg border border-slate-200 animate-fade-in-up" style={{animationDelay: '200ms'}}>
                <p className="text-sm text-slate-500">Invested Amount</p>
                <p className="text-xl font-bold text-slate-700">{formatCurrency(totalInvested)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                <p className="text-sm text-slate-500">Estimated Returns</p>
                <p className="text-xl font-bold text-emerald-600">{formatCurrency(estimatedReturns)}</p>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-end animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <ResultChart investedAmount={totalInvested} estimatedReturns={estimatedReturns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
