import { Database } from "../interfaces/Database.js";
import sqlite3 from "sqlite3";
import fs from "node:fs";
import path from "node:path";
import { getRootDir } from "../../shared/utils/get-root-dir.js";
import { DB_PATH } from "../../shared/constants/DB_PATH.js";
export class DatabaseSqlite implements Database {
	private sqliteDB: sqlite3.Database;
	private static instance = new DatabaseSqlite();
	private constructor() {
		if (!fs.existsSync(path.join(getRootDir(), "database"))) {
			fs.mkdirSync(path.join(getRootDir(), "database"));
			fs.writeFileSync(DB_PATH, "");
		}
		this.sqliteDB = new sqlite3.Database(DB_PATH);
	}
	static getInstance():DatabaseSqlite  {
		return DatabaseSqlite.instance;
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
                        block_explorer_url VARCHAR(255),
                        ticker VARCHAR(10)
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
	seed(): Promise<void> {
		throw new Error("Method not implemented.");
	}
	selectQuery<T>(query:string,args?:any[]):Promise<T[]>{
		return new Promise((resolve,reject)=>{
			DatabaseSqlite.instance.sqliteDB.all<T>(query,args,(err,rows)=>{
				if(err){
					reject(err)
				}
				resolve(rows)
			})
		})
	}
	modifyQuery(query:string,args?:any[]):Promise<void>{
		return new Promise((resolve,reject)=>{
			DatabaseSqlite.instance.sqliteDB.run(query,args,(res:any,err:any)=>{
				if(err){
					reject(err)
				}
				resolve()
			})
		})
	}
}

