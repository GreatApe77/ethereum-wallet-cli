import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { SwitchAccountPrompt } from "../services/prompt/switchAccount/SwitchAccountPrompt.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";

export class SwitchAccountController {
	constructor(
		private readonly switchAccountPrompt: Prompt<{ selectedAccount: number }>,
        private readonly navigationService: Navigation
	) {}

	async handle() {
		const settings = SettingsFs.getInstance();
        const wallet = EthersWallet.getInstance()
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
