import { Network } from "../entities/Network.js";

export interface NetworkRepository{
    getNetworks(): Promise<Network[]>
    getNetworkById(id: number): Promise<Network | null>
    createNetwork(network: Network): Promise<void>
    deleteNetwork(id: number): Promise<void>
    updateNetwork(id: number, network: Partial<Network>): Promise<void>
}