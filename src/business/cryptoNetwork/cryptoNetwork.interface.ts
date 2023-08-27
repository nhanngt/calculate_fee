export const CryptoNetwork = {
  ETHEREUM: "ethereum",
};

export abstract class ICryptoNetworkRepo {
  getFee: () => number;
}
