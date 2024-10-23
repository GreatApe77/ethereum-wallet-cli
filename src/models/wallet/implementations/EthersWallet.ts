import { ethers } from "ethers";
import { Wallet } from "../Wallet.js";
import { PARENT_PATH } from "../../../shared/constants/PARENT_PATH.js";
import { WalletRepository } from "../repository/WalletRepository.js";
import { WalletRepositorySqlite } from "../repository/implementations/WalletRepositorySqlite.js";

export class EthersWallet implements Wallet {
	private static instance: EthersWallet | null = null;
	private ethersWallet: ethers.HDNodeWallet | null;
	private walletRepository: WalletRepository = new WalletRepositorySqlite();
	private constructor() {
		this.ethersWallet = null;
		
	}
	exists(): boolean {
		throw new Error("Method not implemented.");
	}
	getMnemonic(): string {
		return this.ethersWallet?.mnemonic?.phrase as string
	}
	getAddress(accountIndex: number): string {
		return this.ethersWallet?.deriveChild(accountIndex).address as string
	}
	public encryptWallet(password: string): Promise<string> {
		return this.ethersWallet?.encrypt(password) as Promise<string>;
	}
	public static getInstance(): Wallet {
		if (!EthersWallet.instance) {
			EthersWallet.instance = new EthersWallet();
		}
		return EthersWallet.instance;
	}
	public async login(
		password: string,
		jsonWalletString: string
	): Promise<void> {
		let tempWallet = (await ethers.Wallet.fromEncryptedJson(
			jsonWalletString,
			password
		)) as ethers.HDNodeWallet;

		this.ethersWallet = ethers.HDNodeWallet.fromPhrase(
			tempWallet.mnemonic?.phrase!,
			undefined,
			PARENT_PATH
		);
	}
	public import(mnemonic: string): void {
		throw new Error("Method not implemented.");
	}

	public getBalance(): Promise<bigint> {
		throw new Error("Method not implemented.");
	}
	public switchAccount(accountIndex: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
	public generateNew(): void {
		this.ethersWallet = ethers.HDNodeWallet.createRandom(
			undefined,
			PARENT_PATH
		);
	}
}
