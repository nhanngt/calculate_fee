import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import app from "@app/apps/app";

chai.use(chaiHttp);
const expect = chai.expect;

describe("#Post.transactionFee", () => {
  it(`When: Request transaction fee without fromAmount
      Should: return 400 with message`, async () => {
    const result = await chai
      .request(app)
      .post("/transactions-fee")
      .send({
        transaction: {
          // fromAmount: "100",
          fromNetwork: "ACH",
          fromAsset: "USD",
          toNetwork: "ethereum",
          toAsset: "ETH",
          feeAsset: "USD",
        },
        customer: { tier: 1 },
        availableProviders: [],
      });

    expect(result.statusCode).equal(400);
  });
  it(`When: Request transaction with fromNetwork and toNetwork are crypto
      Should: return 400 with message`, async () => {
    const result = await chai
      .request(app)
      .post("/transactions-fee")
      .send({
        transaction: {
          fromAmount: "100",
          fromNetwork: "ethereum",
          fromAsset: "ETH",
          toNetwork: "ethereum",
          toAsset: "ETH",
          feeAsset: "USD",
        },
        customer: { tier: 1 },
        availableProviders: [],
      });

    expect(result.statusCode).equal(400);
  });
  it(`When: Request transaction with valid request
      Should: return 200 with mock fee`, async () => {
    const result = await chai
      .request(app)
      .post("/transactions-fee")
      .send({
        transaction: {
          fromAmount: "100",
          fromNetwork: "ACH",
          fromAsset: "USD",
          toNetwork: "ethereum",
          toAsset: "ETH",
          feeAsset: "USD",
        },
        customer: { tier: 1 },
        availableProviders: [],
      });

    expect(result.statusCode).equal(200);
    expect(result.body.fee).equal(12.26);
    expect(result.body.provider).equal("Duck");
    expect(result.body.asset).equal("USD");
  });
});
