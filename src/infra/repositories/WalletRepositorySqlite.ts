import { DatabaseSqlite } from "../database/DatabaseSqlite.js";
import { WalletRepository } from "../../domain/repositories/WalletRepository.js";

export class WalletRepositorySqlite implements WalletRepository{
    constructor(private db: DatabaseSqlite) {}

    async saveEncryptedWallet(encryptedWallet: string): Promise<void> {
        await this.db.modifyQuery(
            "INSERT INTO wallets(encrypted_json_wallet,id) VALUES(?,?);",
            [encryptedWallet,1]
        )
    }

    async getEncryptedWallet(): Promise<string|null> {
        const encryptedWallet = await this.db.selectQuery<{encryptedWalletJson:string}>(
            "SELECT encrypted_json_wallet as encryptedWalletJson FROM wallets;"
        )
        if(encryptedWallet.length === 0){
            return null
        }
        return encryptedWallet[0].encryptedWalletJson

    }
    async deleteEncryptedWallet(): Promise<void> {
        await this.db.modifyQuery(
            "DELETE FROM wallets;"
        )
    }
    
}