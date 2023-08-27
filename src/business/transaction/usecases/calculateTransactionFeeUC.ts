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

export interface ICalculateTransactionFeeReq {
  transaction: ITransaction;
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
  // TODO: implement business logic to calculate total fee

  // INFO: just return mock data now
  return {
    result: {
      fee: 12.26,
      asset: SupportedAssetFee.USD,
      provider: Providers.DUCK,
    },
  };
};
