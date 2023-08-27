import { ICryptoNetworkRepo } from "@app/business/cryptoNetwork/cryptoNetwork.interface";

export default class CryptoNetworkService implements ICryptoNetworkRepo {
  getFee(): number {
    // hard code the service, we can update this implementation later when integrate with third party
    return 10;
  }
}
