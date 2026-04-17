
export abstract class WalletService {
    abstract getBalance(providerUrl: string): Promise<bigint>;
    abstract switchAccount(accountIndex: number): Promise<void>;
    abstract generateNew(): void;
    abstract login(password: string, jsonWalletString: string): Promise<void>;
    abstract import(mnemonic: string): void;
    abstract encryptWallet(password: string): Promise<string>;
    abstract getAddress(accountIndex: number): string;
    abstract getMnemonic(): string;
    abstract exists(): boolean;
    abstract reset(): void;
    abstract fromMnemonic(mnemonic: string): void;
}