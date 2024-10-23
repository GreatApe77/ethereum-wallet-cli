export interface WalletRepository {
    getEncryptedWallet(): Promise<string>;
}