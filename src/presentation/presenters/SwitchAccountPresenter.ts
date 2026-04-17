import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";
import { WalletService } from "../../domain/services/WalletService.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { Prompt } from "../prompts/Prompt.js";
import { SwitchAccountPrompt } from "../prompts/switchAccount/SwitchAccountPrompt.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";

export class SwitchAccountPresenter {
	constructor(
        private readonly walletService: WalletService,
        private readonly settingsRepository: SettingsRepository,
		private readonly switchAccountPrompt: Prompt<{ selectedAccount: number }>,
        private readonly navigationService: Navigation
	) {}

	async handle() {
		const settings = this.settingsRepository;
        const wallet = this.walletService
		Clear.render();
		FancyDivider.render();
		FancyTitle.render("Switch Account");
		FancyDivider.render();
		
        ActionFeedback.render(`Connected Account: ${wallet.getAddress(settings.settings.connectedAccountIndex)}`,"info")

        const { selectedAccount } = await this.switchAccountPrompt.question({});
        if(selectedAccount === -1) {
            return await this.navigationService.navigateTo("main-menu")
        }
        
        settings.settings.connectedAccountIndex = selectedAccount
        settings.save();
        await this.navigationService.navigateTo("switch-account")
	}
}
