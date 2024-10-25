import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { WalletRepository } from "../models/wallet/repository/WalletRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import {
	CreateOrImportPrompt,
	CreateOrImportPromptOptions,
} from "../services/prompt/create-or-import/CreateOrImportPrompt.js";
import { LoginOrResetPromptOptions } from "../services/prompt/login-or-reset/LoginOrResetPrompt.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { TermiWalletTitle } from "../ui/components/TermiWalletTitle.js";
import { Controller } from "./Controller.js";

export class AuthController implements Controller {
	constructor(
		private readonly createOrImportPrompt: Prompt<{
			option: CreateOrImportPromptOptions;
		}>,
		private readonly loginOrResetPrompt: Prompt<{
			option: LoginOrResetPromptOptions;
		}>,
		private readonly navigationService: Navigation,
		private readonly walletRepository: WalletRepository
	) {}
	async handle(): Promise<void> {
		const walletRegistered = await this.walletRepository.getEncryptedWallet();
		TermiWalletTitle.render();
		if (!walletRegistered) {
			const { option } = await this.createOrImportPrompt.question();
			switch (option) {
				case CreateOrImportPromptOptions.CREATE:
					await this.navigationService.navigateTo("generate-wallet");
					break;
				case CreateOrImportPromptOptions.IMPORT:
					await this.navigationService.navigateTo("import-wallet");
					break;
			}
		} else {
			const  {option}  = await this.loginOrResetPrompt.question();
			
			switch (option) {
				case LoginOrResetPromptOptions.LOGIN:
					await this.navigationService.navigateTo("login");

					break;
				case LoginOrResetPromptOptions.RESET:
					await this.navigationService.navigateTo("reset");
					break;
			}
		}
	}
}
