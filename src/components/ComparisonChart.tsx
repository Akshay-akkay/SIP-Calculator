import React from 'react';
import { formatCurrency } from '../lib/utils';

interface ComparisonChartProps {
  resultA: { totalInvested: number; totalValue: number };
  resultB: { totalInvested: number; totalValue: number };
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ resultA, resultB }) => {
  const maxValue = Math.max(resultA.totalValue, resultB.totalValue);

  const Bar = ({ value, maxValue, color, label }: { value: number; maxValue: number; color: string; label: string }) => {
    const heightPercentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
    return (
      <div className="flex flex-col items-center h-full justify-end group">
        <div
          className={`w-full ${color} rounded-t-md transition-all duration-500 ease-out flex items-end justify-center`}
          style={{ height: `${heightPercentage}%` }}
        >
          <span className="text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-black/20 rounded-sm">
            {formatCurrency(value)}
          </span>
        </div>
        <span className="text-xs text-slate-500 mt-1">{label}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-slate-100 p-4 rounded-lg border border-slate-200">
      <h4 className="text-sm font-semibold text-slate-600 mb-4 text-center">Total Value Comparison</h4>
      <div className="flex justify-around items-end h-64 gap-4">
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-end h-full w-full gap-2">
            <Bar value={resultA.totalInvested} maxValue={maxValue} color="bg-slate-400" label="Invested" />
            <Bar value={resultA.totalValue} maxValue={maxValue} color="bg-slate-700" label="Value" />
          </div>
          <p className="font-bold text-slate-800 mt-2">Scenario A</p>
        </div>
        <div className="flex flex-col items-center w-1/3">
          <div className="flex items-end h-full w-full gap-2">
            <Bar value={resultB.totalInvested} maxValue={maxValue} color="bg-brand-400" label="Invested" />
            <Bar value={resultB.totalValue} maxValue={maxValue} color="bg-brand-600" label="Value" />
          </div>
          <p className="font-bold text-brand-800 mt-2">Scenario B</p>
        </div>
      </div>
       <div className="flex justify-center mt-6 space-x-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-400"></span>
            <span>A: Invested</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-700"></span>
            <span>A: Total Value</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-400"></span>
            <span>B: Invested</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-600"></span>
            <span>B: Total Value</span>
          </div>
        </div>
    </div>
  );
};

export default ComparisonChart;
