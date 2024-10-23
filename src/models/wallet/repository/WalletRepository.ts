export interface WalletRepository {
    getEncryptedWallet(): Promise<string>;
    saveEncryptedWallet(encryptedWallet: string): Promise<void>;
}