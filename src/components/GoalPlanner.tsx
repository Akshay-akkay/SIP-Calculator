import React, { useState, useMemo } from 'react';
import { Target, Landmark, ChevronsUp, TrendingUp, Clock } from 'lucide-react';
import SliderInput from './SliderInput';
import { formatCurrency } from '../lib/utils';
import { calculateFutureValue } from '../lib/investmentCalculations';

const GoalPlanner: React.FC = () => {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [timePeriod, setTimePeriod] = useState(15);
  const [returnRate, setReturnRate] = useState(12);
  const [lumpsum, setLumpsum] = useState(100000);
  const [stepUp, setStepUp] = useState(10);

  const { requiredMonthlyInvestment, finalProjection } = useMemo(() => {
    const lumpsumFutureValue = calculateFutureValue({
      lumpsum,
      monthlyInvestment: 0,
      stepUp: 0,
      returnRate,
      timePeriod,
    }).totalValue;

    if (lumpsumFutureValue >= targetAmount) {
      return { requiredMonthlyInvestment: 0, finalProjection: null };
    }

    const targetFromSip = targetAmount - lumpsumFutureValue;

    // Binary search for the required monthly investment
    let low = 0;
    let high = targetAmount; // A safe upper bound
    let mid = 0;
    let precision = 1; // Search until we are within 1 currency unit

    for (let i = 0; i < 100; i++) { // Limit iterations to prevent infinite loops
      mid = (low + high) / 2;
      const fv = calculateFutureValue({
        lumpsum: 0, // Lumpsum part is already accounted for
        monthlyInvestment: mid,
        stepUp,
        returnRate,
        timePeriod,
      }).totalValue;

      if (Math.abs(fv - targetFromSip) < precision) {
        break;
      }

      if (fv > targetFromSip) {
        high = mid;
      } else {
        low = mid;
      }
    }
    
    const monthlySip = mid > 0 ? mid : 0;

    const projection = calculateFutureValue({
      lumpsum,
      monthlyInvestment: monthlySip,
      stepUp,
      returnRate,
      timePeriod,
    });

    return { requiredMonthlyInvestment: monthlySip, finalProjection: projection };
  }, [targetAmount, timePeriod, returnRate, lumpsum, stepUp]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 p-8 lg:p-10 border-r border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">Goal Planner</h2>
          <div className="space-y-8">
            <SliderInput
              label="Target Amount"
              value={targetAmount}
              onChange={setTargetAmount}
              min={100000}
              max={50000000}
              step={100000}
              format={formatCurrency}
              icon={<Target className="w-5 h-5 text-brand-600" />}
            />
            <SliderInput
              label="Time Period (Years)"
              value={timePeriod}
              onChange={setTimePeriod}
              min={1}
              max={40}
              step={1}
              format={(v) => `${v} Yr`}
              icon={<Clock className="w-5 h-5 text-brand-600" />}
            />
            <SliderInput
              label="Expected Return Rate (p.a.)"
              value={returnRate}
              onChange={setReturnRate}
              min={1}
              max={30}
              step={0.5}
              format={(v) => `${v}%`}
              icon={<TrendingUp className="w-5 h-5 text-brand-600" />}
            />
            <SliderInput
              label="Lumpsum Investment"
              value={lumpsum}
              onChange={setLumpsum}
              min={0}
              max={1000000}
              step={10000}
              format={formatCurrency}
              icon={<Landmark className="w-5 h-5 text-brand-600" />}
            />
            <SliderInput
              label="Annual Step-up"
              value={stepUp}
              onChange={setStepUp}
              min={0}
              max={25}
              step={1}
              format={(v) => `${v}%`}
              icon={<ChevronsUp className="w-5 h-5 text-brand-600" />}
            />
          </div>
        </div>
        <div className="lg:col-span-3 p-8 lg:p-10 bg-slate-50/50 flex flex-col justify-center items-center text-center">
          <div className="animate-fade-in-up">
            <p className="text-slate-500">To reach your goal of <span className="font-bold text-slate-600">{formatCurrency(targetAmount)}</span> in {timePeriod} years, you need to invest:</p>
            <p className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight my-3">
              {formatCurrency(requiredMonthlyInvestment)}
            </p>
            <p className="text-slate-500 mb-8">per month (with {stepUp}% annual step-up).</p>
            
            {finalProjection && (
              <div className="w-full max-w-sm mx-auto space-y-3 text-left">
                <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center">
                  <p className="text-sm text-slate-500">Total Invested</p>
                  <p className="text-lg font-bold text-slate-700">{formatCurrency(finalProjection.totalInvested)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center">
                  <p className="text-sm text-slate-500">Estimated Returns</p>
                  <p className="text-lg font-bold text-emerald-600">{formatCurrency(finalProjection.estimatedReturns)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200 flex justify-between items-center">
                  <p className="text-sm text-slate-500">Projected Value</p>
                  <p className="text-lg font-bold text-brand-700">{formatCurrency(finalProjection.totalValue)}</p>
                </div>
              </div>
            )}
             {requiredMonthlyInvestment === 0 && lumpsum > 0 && (
                <p className="mt-6 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg">
                  Your lumpsum investment alone is projected to meet or exceed your goal! No additional monthly investment is required.
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalPlanner;
