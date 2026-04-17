export abstract class WalletRepository {
    abstract getEncryptedWallet(): Promise<string|null>;
    abstract saveEncryptedWallet(encryptedWallet: string): Promise<void>;
    abstract deleteEncryptedWallet(): Promise<void>;
}