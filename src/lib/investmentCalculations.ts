export interface InvestmentParams {
  lumpsum: number;
  monthlyInvestment: number;
  stepUp: number; // percentage
  returnRate: number; // percentage
  timePeriod: number; // years
}

export interface CalculationResult extends InvestmentParams {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
}

export const calculateFutureValue = (params: InvestmentParams): CalculationResult => {
  const { lumpsum, monthlyInvestment, stepUp, returnRate, timePeriod } = params;

  const monthlyRate = returnRate / 12 / 100;
  const annualStepUpRate = stepUp / 100;
  const months = timePeriod * 12;

  let futureValue = lumpsum;
  let totalInvestedAmount = lumpsum;
  let currentMonthlyInvestment = monthlyInvestment;

  if (months > 0) {
    // Lumpsum growth
    futureValue = lumpsum * Math.pow(1 + monthlyRate, months);

    // SIP growth
    let sipFutureValue = 0;
    currentMonthlyInvestment = monthlyInvestment;
    for (let m = 1; m <= months; m++) {
      sipFutureValue += currentMonthlyInvestment;
      sipFutureValue *= (1 + monthlyRate);
      totalInvestedAmount += currentMonthlyInvestment;

      if (m % 12 === 0 && m < months) {
        currentMonthlyInvestment *= (1 + annualStepUpRate);
      }
    }
    futureValue += sipFutureValue;
  } else {
     // if time is 0, future value is just the lumpsum
     futureValue = lumpsum;
     totalInvestedAmount = lumpsum;
  }
  
  const returns = futureValue - totalInvestedAmount;

  return {
    ...params,
    totalInvested: totalInvestedAmount,
    estimatedReturns: returns,
    totalValue: futureValue,
  };
};
