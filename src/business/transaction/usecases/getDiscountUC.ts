import { CryptoNetwork } from "@app/business/cryptoNetwork/cryptoNetwork.interface";
import { FiatNetwork } from "@app/business/fiatNetwork/fiatNetwork.interface";
import { CustomerTier } from "@app/business/transaction/transaction.interface";

interface IGetDiscountInput {
  customerTier: (typeof CustomerTier)[keyof typeof CustomerTier];
  fiatNetwork: (typeof FiatNetwork)[keyof typeof FiatNetwork];
  cryptoNetwork: (typeof CryptoNetwork)[keyof typeof CryptoNetwork];
}
interface IGetDiscountOutput {
  fiatDiscount: number;
  cryptoDiscount: number;
}

export const getDiscountUC = (input: IGetDiscountInput): IGetDiscountOutput => {
  // TIER 2
  if (input.customerTier === CustomerTier.TIER_2) {
    return { fiatDiscount: 0.25, cryptoDiscount: 0.25 };
  }
  // TIER 3
  if (input.customerTier === CustomerTier.TIER_3) {
    return {
      fiatDiscount: input.fiatNetwork === FiatNetwork.WIRE ? 0.25 : 1,
      cryptoDiscount:
        input.cryptoNetwork === CryptoNetwork.ETHEREUM ? 0.25 : 0.5,
    };
  }
  // TIER 1 or unknown
  return { fiatDiscount: 0, cryptoDiscount: 0 };
};
