import Joi from "joi";
import {
  SupportedAssetFee,
  ITransaction,
  CustomerTier,
  AssetSupport,
} from "@app/business/transaction/transaction.interface";
import { FiatNetwork } from "@app/business/fiatNetwork/fiatNetwork.interface";
import { CryptoNetwork } from "@app/business/cryptoNetwork/cryptoNetwork.interface";
import { Providers } from "@app/business/provider/provider.interface";

//
export const transactionFeeReqSchema: Joi.ObjectSchema<ITransaction> =
  Joi.object({
    transaction: {
      fromAmount: Joi.string()
        .required()
        .pattern(/^\d+(\.\d+)?$/)
        .message('"fromAmount" must be a valid number'),
      fromNetwork: Joi.string()
        .valid(
          ...[...Object.values(FiatNetwork), ...Object.values(CryptoNetwork)]
        )
        .required(),
      fromAsset: Joi.string()
        .valid(...Object.values(AssetSupport))
        .required(),
      toNetwork: Joi.string()
        .valid(
          ...[...Object.values(FiatNetwork), ...Object.values(CryptoNetwork)]
        )
        .required(),
      toAsset: Joi.string()
        .valid(...Object.values(AssetSupport))
        .required(),
      feeAsset: Joi.string()
        .valid(...Object.values(SupportedAssetFee))
        .required(),
    },
    customer: {
      tier: Joi.string()
        .valid(...Object.values(CustomerTier))
        .required(),
    },
    availableProviders: Joi.array()
      .items(Joi.string().valid(...Object.values(Providers)))
      .required(),
  });
