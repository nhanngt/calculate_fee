import { AssetSupport } from "@app/business/transaction/transaction.interface";

const ExchangeRateData = {
  ETH_USD: 100,
  USD_ETH: 0.01,
};

interface IGetExchangeRateInput {
  fromAsset: (typeof AssetSupport)[keyof typeof AssetSupport];
  toAsset: (typeof AssetSupport)[keyof typeof AssetSupport];
}

export const getExchangeRateUC = (input: IGetExchangeRateInput): number => {
  const exchangeKey = `${input.fromAsset}_${input.toAsset}`;
  return ExchangeRateData[exchangeKey];
};
