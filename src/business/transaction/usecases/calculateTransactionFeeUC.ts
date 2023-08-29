import _ from "lodash";
import {
  ITransaction,
  ICustomer,
  SupportedAssetFee,
} from "@app/business/transaction/transaction.interface";
import { getDiscountUC } from "./getDiscountUC";
import TransactionModel from "../transaction.model";
import { Providers } from "@app/business/provider/provider.interface";
import { IUsecaseOutput } from "@app/business/common/interfaces/usecase_output.interface";
import { getFiatNetworkFeeUC } from "@app/business/fiatNetwork/usecases/getFiatNetworkFeeUC";
import { ICryptoNetworkRepo } from "@app/business/cryptoNetwork/cryptoNetwork.interface";
import { getExchangeRateUC } from "@app/business/provider/usecases/getExchangeRateUC";
import { getProviderFeeUC } from "@app/business/provider/usecases/getProviderFeeUC";

export interface ICalculateTransactionFeeReq {
  transaction: Omit<ITransaction, "exchangedAmount">;
  customer: ICustomer;
  availableProviders: string[];
}

export interface ICalculateTransactionFeeOutput {
  fee: number;
  asset: string;
  provider: string;
}
export interface IAdapter {
  cryptoNetworkRepo: ICryptoNetworkRepo;
}

export const calculateTransactionFeeUC = async (
  inputData: ICalculateTransactionFeeReq,
  adapter: IAdapter
): Promise<IUsecaseOutput<ICalculateTransactionFeeOutput>> => {
  const transaction = new TransactionModel(inputData);
  const { isValid, message } = transaction.validate();
  if (!isValid) {
    return {
      error: { message, code: 400 },
      result: null,
    };
  }
  if (!transaction.isOnRamp()) {
    transaction.transaction.exchangedAmount = getExchangeRateUC({
      fromAsset: transaction.transaction.fromAsset,
      toAsset: transaction.transaction.toAsset,
    });
  }
  // fromamount -> feeFromAmount
  // provider -> feeProvider
  // exchangedAmount -> feeFromExchangedAmount
  // TODO: implement business logic to calculate total fee
  const cryptoFee = adapter.cryptoNetworkRepo.getFee(); // 10
  const fiatFee = getFiatNetworkFeeUC({
    network: transaction.getFiatNetwork(),
    fiatAmount: transaction.getFiatAmount(),
  }); // 3
  const providerFees = _.map(transaction.availableProviders, (provider) => ({
    fee: getProviderFeeUC({ provider, amount: transaction.getFiatAmount() }),
    provider,
  })).sort((a, b) => a.fee - b.fee);
  const providerFee = providerFees[0]; //0.3

  // get discount
  const discount = getDiscountUC({
    customerTier: transaction.customer.tier,
    fiatNetwork: transaction.getFiatNetwork(),
    cryptoNetwork: transaction.getCryptoNetwork(),
  });

  // in USD
  const totalFee =
    cryptoFee * (1 - discount.cryptoDiscount) +
    fiatFee * (1 - discount.fiatDiscount) +
    providerFee.fee;

  // INFO: just return mock data now
  return {
    result: {
      fee: totalFee,
      asset: SupportedAssetFee.USD,
      provider: providerFee.provider,
    },
    error: null,
  };
};
