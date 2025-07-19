import React from 'react';
import { formatCurrency } from '../lib/utils';

interface ResultChartProps {
  investedAmount: number;
  estimatedReturns: number;
}

const ResultChart: React.FC<ResultChartProps> = ({ investedAmount, estimatedReturns }) => {
  const totalValue = investedAmount + estimatedReturns;
  const investedPercentage = totalValue > 0 ? (investedAmount / totalValue) * 100 : 0;
  const returnsPercentage = totalValue > 0 ? (estimatedReturns / totalValue) * 100 : 0;

  return (
    <div>
      <div className="flex w-full h-12 rounded-lg overflow-hidden bg-slate-200">
        <div
          className="bg-slate-700 h-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500 ease-out"
          style={{ width: `${investedPercentage}%` }}
        >
          {investedPercentage > 15 && <span className="opacity-75">Invested</span>}
        </div>
        <div
          className="bg-emerald-500 h-full flex items-center justify-center text-white font-bold text-sm transition-all duration-500 ease-out"
          style={{ width: `${returnsPercentage}%` }}
        >
          {returnsPercentage > 15 && <span className="opacity-75">Returns</span>}
        </div>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-700"></span>
          <span className="text-slate-600">Invested: <span className="font-semibold">{formatCurrency(investedAmount)}</span></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600">Returns: <span className="font-semibold">{formatCurrency(estimatedReturns)}</span></span>
        </div>
      </div>
    </div>
  );
};

export default ResultChart;
