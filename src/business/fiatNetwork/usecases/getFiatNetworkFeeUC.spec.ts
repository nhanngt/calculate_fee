import chai from "chai";
import { describe, it } from "mocha";
import { getFiatNetworkFeeUC } from "./getFiatNetworkFeeUC";
import { FiatNetwork } from "../fiatNetwork.interface";

const expect = chai.expect;

describe("#usecase.getFiatNetworkFeeUC", () => {
  it(`When: Request with network ACH and amount = 100
      Should: use fixed fee is 2`, async () => {
    const actual = getFiatNetworkFeeUC({
      fiatAmount: 100,
      network: FiatNetwork.ACH,
    });

    expect(actual).equal(2);
  });
  it(`When: Request with network ACH and amount = 1000
      Should: use percent fee and return 10`, async () => {
    const actual = getFiatNetworkFeeUC({
      fiatAmount: 1000,
      network: FiatNetwork.ACH,
    });

    expect(actual).equal(10);
  });

  it(`When: Request with network Wire and amount = 100
      Should: use fixed fee is 25`, async () => {
    const actual = getFiatNetworkFeeUC({
      fiatAmount: 100,
      network: FiatNetwork.WIRE,
    });

    expect(actual).equal(25);
  });
  it(`When: Request with network Card and amount = 100
      Should: use percent fee and return 3`, async () => {
    const actual = getFiatNetworkFeeUC({
      fiatAmount: 100,
      network: FiatNetwork.CARD,
    });

    expect(actual).equal(3);
  });
});
