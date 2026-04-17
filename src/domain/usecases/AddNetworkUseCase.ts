import { Network } from "../entities/Network.js";
import { NetworkRepository } from "../repositories/NetworkRepository.js";

export class AddNetworkUseCase {
    constructor(private networkRepository: NetworkRepository) {}

    async execute(params: {
        chainId: number;
        chainName: string;
        currencyTicker: string;
        rpcUrl: string;
    }): Promise<void> {
        const networkToSave = new Network({
            id: params.chainId,
            name: params.chainName,
            currencyTicker: params.currencyTicker,
            rpcUrl: params.rpcUrl
        });
        await this.networkRepository.createNetwork(networkToSave);
    }
}
