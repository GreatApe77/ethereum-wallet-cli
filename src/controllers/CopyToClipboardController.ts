import { text } from "figlet";
import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { ClipboardService } from "../services/clipboard/ClipboardService.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Controller } from "./Controller.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { sleep } from "../shared/utils/sleep.js";

export class CopyToClipBoardController implements Controller {
    constructor(
        private readonly clipboardService: ClipboardService,
        private readonly navigationService: Navigation
    ) {}
    async handle(): Promise<void> {
        const settings = SettingsFs.getInstance();
        const wallet = EthersWallet.getInstance()
        Clear.render();
        Spinner.start("Copying to clipboard...");

        const connectedAccount = wallet.getAddress(settings.settings.connectedAccountIndex)
        await this.clipboardService.copyToClipboard(connectedAccount);
        ActionFeedback.render(`Copied ${connectedAccount} to Clipboard!`, "success");
        Spinner.success()
        await sleep(0.5)
        await this.navigationService.navigateTo("main-menu");
    }
}