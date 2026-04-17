import { WalletService } from "../../domain/services/WalletService.js";
import { WalletRepository } from "../../domain/repositories/WalletRepository.js";
import { Navigation } from "../../domain/services/Navigation.js";
import {
	CreateOrImportPrompt,
	CreateOrImportPromptOptions,
} from "../prompts/create-or-import/CreateOrImportPrompt.js";
import { LoginOrResetPromptOptions } from "../prompts/login-or-reset/LoginOrResetPrompt.js";
import { Prompt } from "../prompts/Prompt.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { TermiWalletTitle } from "../ui/components/TermiWalletTitle.js";
import { Presenter } from "./Presenter.js";

export class AuthPresenter implements Presenter {
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
		Clear.render()
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
