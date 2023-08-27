import { Providers, providerFeeData } from "../provider.interface";

interface IGetProviderFeeInput {
  provider: (typeof Providers)[keyof typeof Providers];
  amount: number;
}

export const getProviderFeeUC = (input: IGetProviderFeeInput): number => {
  const feeInfo = providerFeeData[input.provider];

  const fee =
    feeInfo.fixed + calculateFeeByPercent(input.amount, feeInfo.percent);

  return fee;
};

function calculateFeeByPercent(amount: number, percentValue: number): number {
  const fee = (amount * percentValue).toFixed(3);

  return parseFloat(fee);
}
