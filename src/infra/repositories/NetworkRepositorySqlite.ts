
import { Network } from "../../domain/entities/Network.js";
import { NetworkRepository } from "../../domain/repositories/NetworkRepository.js";
import { DatabaseSqlite } from "../database/DatabaseSqlite.js";

export class NetworkRepositorySqlite implements NetworkRepository{
    constructor(private db: DatabaseSqlite) {}

    async getNetworks(): Promise<Network[]> {
        const networksFromDb = await this.db.selectQuery<any>("SELECT * FROM networks;")
        return networksFromDb.map(network=>Network.fromJSON(network))
    }
    async getNetworkById(id: number): Promise<Network | null> {
        const networkFromDb = await this.db.selectQuery<Network>(`SELECT 
                
                id,
                rpc_url as rpcUrl,
                name,
                block_explorer_name as blockExplorerName,
                block_explorer_url as blockExplorerUrl,
                ticker as currencyTicker,
                currency_decimals as currencyDecimals
                

            
            FROM networks WHERE id = ?;`, [id])
        if(networkFromDb.length===0){
            return null;
        }
        return Network.fromJSON(networkFromDb[0]);
    }

    // CREATE TABLE IF NOT EXISTS networks(
    //     id INT PRIMARY KEY NOT NULL,
    //     rpc_url VARCHAR(255) NOT NULL,
    //     name VARCHAR(255) NOT NULL,
    //     block_explorer_name VARCHAR(255),
    //     block_explorer_url VARCHAR(255),
    //     ticker VARCHAR(10)
    // );
    async createNetwork(network: Network): Promise<void> {
        const networkJson = network.toJSON();
        await this.db.modifyQuery(
            `
            INSERT INTO networks(id, rpc_url, name, block_explorer_name, block_explorer_url, ticker,currency_decimals)
            VALUES(?,?,?,?,?,?,?);
            `,
            [
                networkJson.id,
                networkJson.rpcUrl,
                networkJson.name,
                networkJson.blockExplorerName,
                networkJson.blockExplorerUrl,
                networkJson.currencyTicker,
                networkJson.currencyDecimals
            ]

            
        )
    }
    deleteNetwork(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateNetwork(id: number, network: Partial<Network>): Promise<void> {
        throw new Error("Method not implemented.");
    }

}