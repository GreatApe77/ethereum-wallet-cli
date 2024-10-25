import { DatabaseSqlite } from "../../../../db/implementations/DatabaseSqlite.js";
import { Network } from "../../entities/Network.js";
import { NetworkRepository } from "../NetworkRepository.js";

export class NetworkRepositorySqlite implements NetworkRepository{
    async getNetworks(): Promise<Network[]> {
        const networksFromDb =await  DatabaseSqlite.getInstance()
        .selectQuery<any>("SELECT * FROM networks;")
        return networksFromDb.map(network=>Network.fromJSON(network))
    }
    async getNetworkById(id: number): Promise<Network | null> {
        const networkFromDb =await  DatabaseSqlite.getInstance()
        .selectQuery<Network>("SELECT * FROM networks WHERE id = ?;", [id])
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
        await DatabaseSqlite.getInstance().modifyQuery(
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