import { ethers } from "ethers";
import { WalletService } from "../../domain/services/WalletService.js";
import { PARENT_PATH } from "../../shared/constants/PARENT_PATH.js";
import { IncorrectPasswordException } from "../../exceptions/IncorrectPasswordException.js";
import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";

export class EthersWallet implements WalletService {
	private ethersWallet: ethers.HDNodeWallet | null;

	constructor(private settingsRepository: SettingsRepository) {
		this.ethersWallet = null;
	}
	fromMnemonic(mnemonic: string): void {
		this.ethersWallet = ethers.HDNodeWallet.fromPhrase(
			mnemonic,
			undefined,
			PARENT_PATH
		);
	}
	reset(): void {
		this.ethersWallet = null;
	}
	exists(): boolean {
		throw new Error("Method not implemented.");
	}
	getMnemonic(): string {
		return this.ethersWallet?.mnemonic?.phrase as string;
	}
	getAddress(accountIndex: number): string {
		return this.ethersWallet?.deriveChild(accountIndex).address as string;
	}
	public encryptWallet(password: string): Promise<string> {
		return this.ethersWallet?.encrypt(password) as Promise<string>;
	}

	public async login(
		password: string,
		jsonWalletString: string
	): Promise<void> {
		try {
			let tempWallet = (await ethers.Wallet.fromEncryptedJson(
				jsonWalletString,
				password
			)) as ethers.HDNodeWallet;

			this.ethersWallet = ethers.HDNodeWallet.fromPhrase(
				tempWallet.mnemonic?.phrase!,
				undefined,
				PARENT_PATH
			);
		} catch (error:any) {
			
			if(error.shortMessage==="incorrect password"){
				throw new IncorrectPasswordException()
			}
			throw new Error();
		}
	}
	public import(mnemonic: string): void {
		throw new Error("Method not implemented.");
	}

	public getBalance(providerUrl:string): Promise<bigint> {
		return this.ethersWallet?.connect(new ethers.JsonRpcProvider(providerUrl)).provider?.getBalance(this.getAddress(this.settingsRepository.settings.connectedAccountIndex)) as Promise<bigint>;
	}
	public async  switchAccount(accountIndex: number): Promise<void> {
		this.ethersWallet = this.ethersWallet?.deriveChild(accountIndex) as ethers.HDNodeWallet;
	}
	public generateNew(): void {
		this.ethersWallet = ethers.HDNodeWallet.createRandom(
			undefined,
			PARENT_PATH
		);
	}
}
