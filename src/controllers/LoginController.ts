import { WalletRepository } from "../models/wallet/repository/WalletRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { Controller } from "./Controller.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
export class LoginController implements Controller {
	constructor(private readonly walletRepository: WalletRepository,private readonly navigationService:Navigation,
        private readonly passwordPrompt:Prompt<{password:string}>
    ) {}
	async handle(): Promise<void> {
		const encryptedWallet = await this.walletRepository.getEncryptedWallet();
		if (!encryptedWallet) {
			return await this.navigationService.navigateTo("auth")
		}
        const {password} = await this.passwordPrompt.question()
        await EthersWallet.getInstance().login(password,encryptedWallet)
        await this.navigationService.navigateTo("main-menu")
	}
}
