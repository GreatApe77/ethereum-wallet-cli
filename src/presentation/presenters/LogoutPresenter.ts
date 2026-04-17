import { WalletService } from "../../domain/services/WalletService.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { sleep } from "../../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Presenter } from "./Presenter.js";

export class LogoutPresenter implements Presenter{
    constructor(
        private readonly walletService: WalletService,
        private readonly navigationService:Navigation
    ){}
    async handle(): Promise<void> {
        const wallet = this.walletService;
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