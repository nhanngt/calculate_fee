import CryptoNetworkService from "@app/infrastructure/cryptoNetworkService/cryptoNetworkService";
import {
  ICalculateTransactionFeeReq,
  calculateTransactionFeeUC,
} from "./calculateTransactionFeeUC";
import { ITransaction } from "../transaction.interface";
import { expect } from "chai";

describe("calcualteTransactionFeeUC", () => {
  it("Usecase1: ", async () => {
    const transactionData: ICalculateTransactionFeeReq = {
      transaction: {
        fromAmount: "100",
        fromNetwork: "Card",
        fromAsset: "USD",
        toNetwork: "ethereum",
        toAsset: "ETH",
        feeAsset: "USD",
      },
      customer: { tier: 1 },
      availableProviders: ["Duck", "Goose"],
    };

    const actualResult = await calculateTransactionFeeUC(transactionData, {
      cryptoNetworkRepo: new CryptoNetworkService(),
    });

    // assert
    expect(actualResult.error).is.equal(null);
    expect(actualResult.result.provider).is.equal("Goose");
    expect(actualResult.result.fee).is.equal(13.3);
  });

  it("#unitest.Usecase1: ", async () => {
    const transactionData: ICalculateTransactionFeeReq = {
      transaction: {
        fromAmount: "100",
        fromNetwork: "ethereum",
        fromAsset: "ETH",
        toNetwork: "Card",
        toAsset: "USD",
        feeAsset: "USD",
      },
      customer: { tier: 1 },
      availableProviders: ["Duck", "Goose"],
    };

    const actualResult = await calculateTransactionFeeUC(transactionData, {
      cryptoNetworkRepo: new CryptoNetworkService(),
    });

    // assert
    expect(actualResult.error).is.equal(null);
    expect(actualResult.result.provider).is.equal("Goose");
    expect(actualResult.result.fee).is.equal(13.3);
  });
});
