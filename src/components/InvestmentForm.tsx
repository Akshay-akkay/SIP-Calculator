import React from 'react';
import { Landmark, ChevronsUp, TrendingUp, Clock } from 'lucide-react';
import SliderInput from './SliderInput';
import { formatCurrency } from '../lib/utils';

export interface InvestmentFormState {
  lumpsum: number;
  monthlyInvestment: number;
  stepUp: number;
  returnRate: number;
  timePeriod: number;
}

interface InvestmentFormProps {
  state: InvestmentFormState;
  onStateChange: (newState: Partial<InvestmentFormState>) => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ state, onStateChange }) => {
  return (
    <div className="space-y-8">
      <SliderInput
        label="Lumpsum Investment"
        value={state.lumpsum}
        onChange={(v) => onStateChange({ lumpsum: v })}
        min={0}
        max={1000000}
        step={10000}
        format={formatCurrency}
        icon={<Landmark className="w-5 h-5 text-brand-600" />}
      />
      <SliderInput
        label="Monthly Investment (SIP)"
        value={state.monthlyInvestment}
        onChange={(v) => onStateChange({ monthlyInvestment: v })}
        min={500}
        max={100000}
        step={500}
        format={formatCurrency}
      />
      <SliderInput
        label="Annual Step-up"
        value={state.stepUp}
        onChange={(v) => onStateChange({ stepUp: v })}
        min={0}
        max={25}
        step={1}
        format={(v) => `${v}%`}
        icon={<ChevronsUp className="w-5 h-5 text-brand-600" />}
      />
      <SliderInput
        label="Expected Return Rate (p.a.)"
        value={state.returnRate}
        onChange={(v) => onStateChange({ returnRate: v })}
        min={1}
        max={30}
        step={0.5}
        format={(v) => `${v}%`}
        icon={<TrendingUp className="w-5 h-5 text-brand-600" />}
      />
      <SliderInput
        label="Time Period (Years)"
        value={state.timePeriod}
        onChange={(v) => onStateChange({ timePeriod: v })}
        min={1}
        max={40}
        step={1}
        format={(v) => `${v} Yr`}
        icon={<Clock className="w-5 h-5 text-brand-600" />}
      />
    </div>
  );
};

export default InvestmentForm;
