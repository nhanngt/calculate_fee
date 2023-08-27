import _ from "lodash";
import { ICustomer, ITransaction } from "./transaction.interface";
import { ICalculateTransactionFeeReq } from "./usecases/calculateTransactionFeeUC";
import { CryptoNetwork } from "../cryptoNetwork/cryptoNetwork.interface";
import { FiatNetwork } from "../fiatNetwork/fiatNetwork.interface";

class TransactionModel {
  readonly transaction: ITransaction;
  readonly customer: ICustomer;
  readonly availableProviders: string[];

  constructor(transactionData: ICalculateTransactionFeeReq) {
    this.transaction = transactionData.transaction;
    this.customer = transactionData.customer;
    this.availableProviders = transactionData.availableProviders;
  }

  validate(): { isValid: boolean; message?: string } {
    // must Fiat -> Crypto (OnRamp) or Crypto -> Fiat (OffRamp)
    const isOnRamp =
      _.values(FiatNetwork).includes(this.transaction.fromNetwork) &&
      _.values(CryptoNetwork).includes(this.transaction.toNetwork);
    const isOffRamp =
      _.values(CryptoNetwork).includes(this.transaction.fromNetwork) &&
      _.values(FiatNetwork).includes(this.transaction.toNetwork);

    console.log(this.transaction);
    if (!isOnRamp && !isOffRamp) {
      return {
        isValid: false,
        message: "Transaction must be On-ramp or Off-ramp.",
      };
    }
    return { isValid: true };
  }

  isOnRamp() {
    const isOnRamp =
      _.values(FiatNetwork).includes(this.transaction.fromNetwork) &&
      _.values(CryptoNetwork).includes(this.transaction.toNetwork);
    return isOnRamp;
  }

  getFiatNetwork(): (typeof FiatNetwork)[keyof typeof FiatNetwork] {
    if (this.isOnRamp()) {
      return this.transaction.fromNetwork;
    }
    return this.transaction.toNetwork;
  }

  getCryptoNetwork(): (typeof CryptoNetwork)[keyof typeof CryptoNetwork] {
    if (this.isOnRamp()) {
      return this.transaction.toNetwork;
    }
    return this.transaction.fromNetwork;
  }
}

export default TransactionModel;
