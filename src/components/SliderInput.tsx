import React from 'react';

interface SliderInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  icon?: React.ReactNode;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  icon,
}) => {
  return (
    <div className="space-y-3 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <label className="font-semibold text-slate-600 flex items-center gap-2">
          {icon}
          {label}
        </label>
        <span className="text-lg font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-md tabular-nums">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
      />
      <div className="flex justify-between text-xs text-slate-400 tabular-nums">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
};

export default SliderInput;
