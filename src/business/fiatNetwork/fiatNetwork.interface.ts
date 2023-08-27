export const FiatNetwork = {
  ACH: "ACH",
  WIRE: "Wire",
  CARD: "Card",
};

export const FiatNetworkFeeType = {
  PERCENT: "percent",
  FIXED: "fixed",
};

export interface IFiatNetworkFee {
  type: (typeof FiatNetworkFeeType)[keyof typeof FiatNetworkFeeType];
  value: number;
}

export const feeData = {
  [FiatNetwork.ACH]: {
    fixed: {
      type: FiatNetworkFeeType.FIXED,
      value: 2,
    },
    percent: {
      type: FiatNetworkFeeType.PERCENT,
      value: 0.01,
    },
  },
  [FiatNetwork.WIRE]: {
    fixed: {
      type: FiatNetworkFeeType.FIXED,
      value: 25,
    },
  },
  [FiatNetwork.CARD]: {
    percent: {
      type: FiatNetworkFeeType.PERCENT,
      value: 0.03,
    },
  },
};
