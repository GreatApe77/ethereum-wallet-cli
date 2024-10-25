import { DatabaseSqlite } from "../db/implementations/DatabaseSqlite.js";
import { Database } from "../db/interfaces/Database.js";
import { CancelOperationException } from "../exceptions/CancelOperationException.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { WalletRepository } from "../models/wallet/repository/WalletRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { ConfirmationPrompt } from "../services/prompt/generate-wallet/ConfirmationPrompt.js";
import { CreatePasswordPrompt } from "../services/prompt/generate-wallet/CreatePasswordPrompt.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { sleep } from "../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { CancelOperationInformation } from "../ui/components/CancelOperationInformation.js";
import { Clear } from "../ui/components/Clear.js";
import { ExplainMnemoincPhrase } from "../ui/components/ExplainMnemonicPhrase.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MnemonicList } from "../ui/components/MnemonicList.js";
import { SaveMnemonicAlert } from "../ui/components/SaveMnemonicAlert.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Controller } from "./Controller.js";

export class GenerateNewWalletController implements Controller {
	constructor(
		private readonly confirmationPrompt: Prompt<{ confirmation: boolean }>,
		private readonly createPasswordPrompt: Prompt<{ password: string }>,
		private readonly walletRepository: WalletRepository,
		private readonly navigationService: Navigation
	) {}

	async handle() {
		try {
			Clear.render();
			EthersWallet.getInstance().generateNew();
			FancyDivider.render();
			FancyTitle.render("Generate New Wallet");
			FancyDivider.render();
			ExplainMnemoincPhrase.render();
			MnemonicList.render(EthersWallet.getInstance().getMnemonic());
			SaveMnemonicAlert.render();
			CancelOperationInformation.render();
			const { confirmation } = await this.confirmationPrompt.question();
			if (confirmation) {
				const { password } = await this.createPasswordPrompt.question();
				const encryptedWallet = await EthersWallet.getInstance().encryptWallet(
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
