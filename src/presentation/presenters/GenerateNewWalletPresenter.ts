

import { CancelOperationException } from "../../exceptions/CancelOperationException.js";
import { WalletService } from "../../domain/services/WalletService.js";
import { WalletRepository } from "../../domain/repositories/WalletRepository.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { ConfirmationPrompt } from "../prompts/generate-wallet/ConfirmationPrompt.js";
import { CreatePasswordPrompt } from "../prompts/generate-wallet/CreatePasswordPrompt.js";
import { Prompt } from "../prompts/Prompt.js";
import { sleep } from "../../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { CancelOperationInformation } from "../ui/components/CancelOperationInformation.js";
import { Clear } from "../ui/components/Clear.js";
import { ExplainMnemoincPhrase } from "../ui/components/ExplainMnemonicPhrase.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MnemonicList } from "../ui/components/MnemonicList.js";
import { SaveMnemonicAlert } from "../ui/components/SaveMnemonicAlert.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Presenter } from "./Presenter.js";

export class GenerateNewWalletPresenter implements Presenter {
	constructor(
        private readonly walletService: WalletService,
		private readonly confirmationPrompt: Prompt<{ confirmation: boolean }>,
		private readonly createPasswordPrompt: Prompt<{ password: string }>,
		private readonly walletRepository: WalletRepository,
		private readonly navigationService: Navigation
	) {}

	async handle() {
		try {
			Clear.render();
			this.walletService.generateNew();
			FancyDivider.render();
			FancyTitle.render("Generate New Wallet");
			FancyDivider.render();
			ExplainMnemoincPhrase.render();
			MnemonicList.render(this.walletService.getMnemonic());
			SaveMnemonicAlert.render();
			CancelOperationInformation.render();
			const { confirmation } = await this.confirmationPrompt.question();
			if (confirmation) {
				const { password } = await this.createPasswordPrompt.question();
				const encryptedWallet = await this.walletService.encryptWallet(
					password
				);
				await this.walletRepository.saveEncryptedWallet(encryptedWallet);
				await this.navigationService.navigateTo("auth");
			} else {
				//alert user that wallet was not saved
				//navigate to initial menu
                ActionFeedback.render("Wallet was not saved", "warning");
                Spinner.start("Navigating to initial menu");
                await sleep(1)
                Spinner.success()
                
				 await this.navigationService.navigateTo("auth");
			}
		} catch (error) {
			if (error instanceof CancelOperationException) {
                ActionFeedback.render("Operation Cancelled", "warning");
                Spinner.start("Cancelling Operation");
                await sleep(1)
                Spinner.success()
                Clear.render()              
				await this.navigationService.navigateTo("auth");
			}
		}
	}
}
