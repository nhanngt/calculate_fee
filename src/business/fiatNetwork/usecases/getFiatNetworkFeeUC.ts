import {
  FiatNetwork,
  feeData,
} from "@app/business/fiatNetwork/fiatNetwork.interface";

interface IGetFiatNetworkFeeInput {
  network: (typeof FiatNetwork)[keyof typeof FiatNetwork];
  fiatAmount: number;
}

export const getFiatNetworkFeeUC = (input: IGetFiatNetworkFeeInput): number => {
  const fee = feeData[input.network];

  // mixed mode, get higher value
  if (fee.fixed && fee.percent) {
    const feeFromPercent = calculateFeeByPercent(
      input.fiatAmount,
      fee.percent.value
    );

    return feeFromPercent > fee.fixed.value ? feeFromPercent : fee.fixed.value;
  }

  if (fee.fixed) {
    return fee.fixed.value;
  }

  return calculateFeeByPercent(input.fiatAmount, fee.percent.value);
};

function calculateFeeByPercent(amount: number, percentValue: number): number {
  const fee = (amount * percentValue).toFixed(3);

  return parseFloat(fee);
}
