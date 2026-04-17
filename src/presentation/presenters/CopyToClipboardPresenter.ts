import { text } from "figlet";
import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";
import { ClipboardService } from "../../domain/services/ClipboardService.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { Presenter } from "./Presenter.js";
import { WalletService } from "../../domain/services/WalletService.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { sleep } from "../../shared/utils/sleep.js";

export class CopyToClipboardPresenter implements Presenter {
    constructor(
        private readonly walletService: WalletService,
        private readonly settingsRepository: SettingsRepository,
        private readonly clipboardService: ClipboardService,
        private readonly navigationService: Navigation
    ) {}
    async handle(): Promise<void> {
        const settings = this.settingsRepository;
        const wallet = this.walletService
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