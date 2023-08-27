export const CustomerTier = {
  TIER_1: 1,
  TIER_2: 2,
  TIER_3: 3,
};

export const AssetSupport = {
  UDS: "USD",
  ETH: "ETH",
};

export const SupportedAssetFee = {
  USD: "USD",
};

export interface ITransaction {
  fromAmount: string;
  fromNetwork: string;
  fromAsset: string;
  toNetwork: string;
  toAsset: string;
  feeAsset: string;
}

export interface ICustomer {
  tier: number;
}
