import React, { useState, useMemo, useRef } from 'react';
import { Thermometer, Download, Loader2 } from 'lucide-react';
import SliderInput from './SliderInput';
import ResultChart from './ResultChart';
import { formatCurrency } from '../lib/utils';
import { calculateFutureValue } from '../lib/investmentCalculations';
import InvestmentForm, { InvestmentFormState } from './InvestmentForm';
import { generatePdfReport } from '../lib/reportGenerator';

const SipCalculator: React.FC = () => {
  const [formState, setFormState] = useState<InvestmentFormState>({
    lumpsum: 50000,
    monthlyInvestment: 10000,
    stepUp: 10,
    returnRate: 12,
    timePeriod: 10,
  });
  const [inflationRate, setInflationRate] = useState(6);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (newState: Partial<InvestmentFormState>) => {
    setFormState(prevState => ({ ...prevState, ...newState }));
  };

  const { totalInvested, estimatedReturns, totalValue } = useMemo(() => {
    return calculateFutureValue(formState);
  }, [formState]);

  const inflationAdjustedValue = useMemo(() => {
    return totalValue / Math.pow(1 + (inflationRate / 100), formState.timePeriod);
  }, [totalValue, inflationRate, formState.timePeriod]);

  const handleDownloadPdf = async () => {
    if (reportRef.current && !isGeneratingPdf) {
      setIsGeneratingPdf(true);
      try {
        const date = new Date().toISOString().split('T')[0];
        await generatePdfReport(reportRef.current, `Investment-Report-${date}.pdf`);
      } catch (error) {
        console.error("Failed to generate PDF report.", error);
        // Here you could show an error message to the user
      } finally {
        setIsGeneratingPdf(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-2 p-8 lg:p-10 border-r border-slate-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">Investment Growth Calculator</h2>
          <InvestmentForm state={formState} onStateChange={handleFormChange} />
          <div className="mt-8">
            <SliderInput
              label="Assumed Inflation Rate (p.a.)"
              value={inflationRate}
              onChange={setInflationRate}
              min={0}
              max={15}
              step={0.5}
              format={(v) => `${v}%`}
              icon={<Thermometer className="w-5 h-5 text-brand-600" />}
            />
          </div>
        </div>
        <div className="lg:col-span-3 p-8 lg:p-10 bg-slate-50/50">
          <div className="flex flex-col h-full">
            <div ref={reportRef} className="bg-white p-6 rounded-xl border border-slate-200">
              <div className="mb-6 text-center">
                <p className="text-slate-500">In {formState.timePeriod} years, you will have</p>
                <p className="text-4xl md:text-5xl font-extrabold text-brand-800 tracking-tight">
                  {formatCurrency(totalValue)}
                </p>
              </div>
              
              <div className="bg-slate-100 p-4 rounded-lg border border-slate-200 mb-6">
                <p className="text-slate-500 text-sm">Value in today's money (after {inflationRate}% inflation)</p>
                <p className="text-2xl font-bold text-slate-700">{formatCurrency(inflationAdjustedValue)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500">Total Invested</p>
                  <p className="text-xl font-bold text-slate-700">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500">Estimated Returns</p>
                  <p className="text-xl font-bold text-emerald-600">{formatCurrency(estimatedReturns)}</p>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-end">
                <ResultChart investedAmount={totalInvested} estimatedReturns={estimatedReturns} />
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-lg shadow-md hover:bg-brand-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:bg-brand-400 disabled:cursor-not-allowed"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
