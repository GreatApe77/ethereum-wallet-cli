import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { QrCode } from "../ui/components/QrCode.js";
import { Controller } from "./Controller.js";

export class GenerateQrCodeController implements Controller {
    constructor(private readonly backToMenuPrompt:Prompt<{option:number}>,
        private readonly navigationService: Navigation
    ){

    }
	async handle(): Promise<void> {
		Clear.render();
        FancyDivider.render();
        FancyTitle.render("QR Code")
        FancyDivider.render();
        const wallet = EthersWallet.getInstance();
        const settings = SettingsFs.getInstance()
        const address = wallet.getAddress(settings.settings.connectedAccountIndex)
        ActionFeedback.render(`QR CODE for address: ${address}`,"info")
        QrCode.render(address)
        const {option} = await this.backToMenuPrompt.question()
        if(option === 1){
            return await this.navigationService.navigateTo("main-menu")
        }
        return await this.navigationService.navigateTo("main-menu")

    
	}
}
