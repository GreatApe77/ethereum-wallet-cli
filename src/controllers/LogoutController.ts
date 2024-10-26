import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { sleep } from "../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Controller } from "./Controller.js";

export class LogoutController implements Controller{
    constructor(
        private readonly navigationService:Navigation
    ){}
    async handle(): Promise<void> {
        const wallet = EthersWallet.getInstance();
        Clear.render();
        Spinner.start("Logging out...");
        wallet.reset();
        await sleep(0.5)
        Spinner.success()
        ActionFeedback.render("Returning...", "success")
        await sleep(0.5)
        await this.navigationService.navigateTo("auth");


        
    }
}