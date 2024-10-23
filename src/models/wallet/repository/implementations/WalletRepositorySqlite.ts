import { DatabaseSqlite } from "../../../../db/implementations/DatabaseSqlite.js";
import { WalletRepository } from "../WalletRepository.js";

export class WalletRepositorySqlite implements WalletRepository{
    async saveEncryptedWallet(encryptedWallet: string): Promise<void> {
        await this.db.modifyQuery(
            "INSERT INTO wallets(encrypted_json_wallet,id) VALUES(?,?);",
            [encryptedWallet,1]
        )
    }
    db: DatabaseSqlite = DatabaseSqlite.getInstance();
    async getEncryptedWallet(): Promise<string> {
        const encryptedWallet = await this.db.selectQuery<{encryptedWalletJson:string}>(
            "SELECT encrypted_json_wallet as encryptedWalletJson FROM wallets;"
        )
        if(encryptedWallet.length === 0){
            
        }

    }
    
}