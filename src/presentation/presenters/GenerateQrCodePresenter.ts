import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";
import { WalletService } from "../../domain/services/WalletService.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { Prompt } from "../prompts/Prompt.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { QrCode } from "../ui/components/QrCode.js";
import { Presenter } from "./Presenter.js";

export class GenerateQrCodePresenter implements Presenter {
    constructor(
        private readonly walletService: WalletService,
        private readonly settingsRepository: SettingsRepository,private readonly backToMenuPrompt:Prompt<{option:number}>,
        private readonly navigationService: Navigation
    ){

    }
	async handle(): Promise<void> {
		Clear.render();
        FancyDivider.render();
        FancyTitle.render("QR Code")
        FancyDivider.render();
        const wallet = this.walletService;
        const settings = this.settingsRepository
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
