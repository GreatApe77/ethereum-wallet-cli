import { Network } from "../entities/Network.js";

export abstract class NetworkRepository {
    abstract getNetworks(): Promise<Network[]>;
    abstract getNetworkById(id: number): Promise<Network | null>;
    abstract createNetwork(network: Network): Promise<void>;
    abstract deleteNetwork(id: number): Promise<void>;
    abstract updateNetwork(id: number, network: Partial<Network>): Promise<void>;
}