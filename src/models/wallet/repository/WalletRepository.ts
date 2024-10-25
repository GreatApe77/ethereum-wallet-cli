export interface WalletRepository {
    getEncryptedWallet(): Promise<string|null>;
    saveEncryptedWallet(encryptedWallet: string): Promise<void>;
    deleteEncryptedWallet(): Promise<void>;
}