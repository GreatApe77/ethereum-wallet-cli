import sqlite3 from "sqlite3";
import fs from "node:fs";
import path from "node:path";
import { getRootDir } from "../../shared/utils/get-root-dir.js";
import { DB_PATH } from "../../shared/constants/DB_PATH.js";
import { Network } from "../../domain/entities/Network.js";

export class DatabaseSqlite {
	private sqliteDB: sqlite3.Database;

	constructor() {
		if (!fs.existsSync(path.join(getRootDir(), "database"))) {
			fs.mkdirSync(path.join(getRootDir(), "database"));
			fs.writeFileSync(DB_PATH, "");
		}
		this.sqliteDB = new sqlite3.Database(DB_PATH);
	}
	async migrate(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.sqliteDB.serialize(() => {
				this.sqliteDB.run(
					`
                    CREATE DATABASE IF NOT EXISTS wallet_cli;
                `,
					(err) => {
						if (err) {
							reject(err);
						}
					}
				);
				// this.sqliteDB.run(
				// 	`USE DATABASE wallet_cli;`
				// )
				this.sqliteDB.run(
					`
                    CREATE TABLE IF NOT EXISTS wallets(
                        id INT PRIMARY KEY NOT NULL,
                        encrypted_json_wallet TEXT NOT NULL
                    );
                `,
					(err) => {
						if (err) {
							reject(err);
						}
					}
				);
				this.sqliteDB.run(
					`
                    CREATE TABLE IF NOT EXISTS networks(
                        id INT PRIMARY KEY NOT NULL,
                        rpc_url VARCHAR(255) NOT NULL,
                        name VARCHAR(255) NOT NULL,
						block_explorer_name VARCHAR(255),
                        block_explorer_url VARCHAR(255),
                        ticker VARCHAR(10) NOT NULL,
						currency_decimals INT NOT NULL
                    );
                `,
					(err) => {
						if (err) {
							reject(err);
						}
					}
				);
				this.sqliteDB.run(
					`
                    
                `,
					(err) => {
						if (err) {
							reject(err);
						}
					}
				);
			});
			resolve();
		});
	}
	async seed(): Promise<void> {
		const standardNetworks: Network[] = [
			new Network({
				id: 1,
				name: 'Ethereum Mainnet',
				rpcUrl: "https://cloudflare-eth.com",
				blockExplorerUrl: "https://etherscan.io",
				blockExplorerName: "Etherscan",
				currencyTicker: "ETH",
				currencyDecimals: 18
			}),
			new Network({
				id: 4002,
				name: 'Fantom Testnet',
				rpcUrl: "https://rpc.testnet.fantom.network",
				blockExplorerUrl: "https://testnet.ftmscan.com",
				blockExplorerName: "Fantom Testnet Explorer",
				currencyTicker: "FTM",
				currencyDecimals: 18
			}),
			new Network({
				id: 11155111,
				name: 'Sepolia',
				currencyTicker: "ETH",
				currencyDecimals: 18,
				rpcUrl: "https://rpc.sepolia.org",
				blockExplorerUrl: "https://sepolia.etherscan.io",
				blockExplorerName: "Sepolia Explorer"
			}),
			new Network({
				id: 31337,
				name: 'Ganache',
				currencyTicker: "ETH",
				currencyDecimals: 18,
				rpcUrl: "http://127.0.0.1:8545",
			})
		];
	
		return new Promise((resolve, reject) => {
			this.sqliteDB.serialize(() => {
				// Start transaction
				this.sqliteDB.run("BEGIN TRANSACTION;", (err) => {
					if (err) {
						return reject(err);
					}
	
					const statement = this.sqliteDB.prepare(
						"INSERT INTO networks (id, rpc_url, name, block_explorer_name, block_explorer_url, ticker,currency_decimals) VALUES (?, ?, ?, ?, ?, ?, ?);"
					);
	
					try {
						standardNetworks.forEach((network) => {
							statement.run(
								network.getId(),
								network.getRpcUrl(),
								network.getName(),
								network.getBlockExplorerName(),
								network.getBlockExplorerUrl(),
								network.getCurrencyTicker(),
								network.getCurrencyDecimals(),
								(err:any) => {
									if (err) throw err;
								}
							);
						});
	
						// Finalize the prepared statement
						statement.finalize((err) => {
							if (err) {
								this.sqliteDB.run("ROLLBACK;", () => reject(err));
								return;
							}
	
							// Commit the transaction
							this.sqliteDB.run("COMMIT;", (err) => {
								if (err) {
									this.sqliteDB.run("ROLLBACK;", () => reject(err));
									return;
								}
								resolve();
							});
						});
					} catch (err) {
						statement.finalize();
						this.sqliteDB.run("ROLLBACK;", () => reject(err));
					}
				});
			});
		});
	}
	selectQuery<T>(query:string,args?:any[]):Promise<T[]>{
		return new Promise((resolve,reject)=>{
			this.sqliteDB.all<T>(query,args,(err,rows)=>{
				if(err){
					reject(err)
				}
				resolve(rows)
			})
		})
	}
	modifyQuery(query:string,args?:any[]):Promise<void>{
		return new Promise((resolve,reject)=>{
			this.sqliteDB.run(query,args,(res:any,err:any)=>{
				if(err){
					reject(err)
				}
				resolve()
			})
		})
	}
}

