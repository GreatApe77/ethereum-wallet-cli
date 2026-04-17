import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Presenter } from "./Presenter.js";
import { NetworkRepository } from "../../domain/repositories/NetworkRepository.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { WalletService } from "../../domain/services/WalletService.js";
import { formatUnits } from "../../shared/utils/formatEther.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Prompt } from "../prompts/Prompt.js";
import { MainMenuOptions } from "../prompts/main-menu-options/MainMenuPrompt.js";
import { CacheService } from "../../domain/services/CacheService.js";
import { getCacheBalanceKey } from "../../shared/utils/get-cache-balance-key.js";
export class MainMenuPresenter implements Presenter {
	constructor(
        private readonly walletService: WalletService,
        private readonly settingsRepository: SettingsRepository,
		private readonly NetworkRepository: NetworkRepository,
		private readonly navigationService: Navigation,
		private readonly mainMenuPrompt: Prompt<{ option: MainMenuOptions }>,
		private readonly cacheService:CacheService
	) {}
	async handle(): Promise<void> {
		Clear.render();
		Spinner.start("Loading...");
		const settings = this.settingsRepository;
		const connectedNetwork = await this.NetworkRepository.getNetworkById(
			settings.settings.connectedChainId
		);
		if (!connectedNetwork) {
			throw new Error("Connected Network not found");
		}
		// const balanceCached = this.cacheService.get<bigint>("balance")
		// let balance:bigint
		
		//  const balance = await this.walletService.getBalance(
		//  	connectedNetwork?.getRpcUrl()
		//  );
		const cacheKey = getCacheBalanceKey({
			accountAddress: this.walletService.getAddress(settings.settings.connectedAccountIndex),
			networkdId: settings.settings.connectedChainId,
			accountIndex: settings.settings.connectedAccountIndex
		})
		let balance = this.cacheService.get<bigint>(cacheKey)
		
		if(balance===null){
			balance = await this.walletService.getBalance(
				connectedNetwork.getRpcUrl()
			)
			this.cacheService.set(cacheKey,balance)
		}

		Spinner.success();
		Clear.render();
		FancyDivider.render();
		FancyTitle.render("Main Menu");
		FancyDivider.render();

		//const connectedNetworkId = settings.settings.connectedChainId

		MarginLeft.render(`Connected Network: ${connectedNetwork?.getName()}`);
		MarginLeft.render(
			`Connected Account: ${this.walletService.getAddress(
				settings.settings.connectedAccountIndex
			)}`
		);
		MarginLeft.render(
			`Balance: ${formatUnits(
				balance,
				18
			)} ${connectedNetwork?.getCurrencyTicker()}`
		);
		const { option } = await this.mainMenuPrompt.question({});
		switch (option) {
			case MainMenuOptions.ACCOUNT_QR_CODE:
				await this.navigationService.navigateTo("qr-code");
				break;

			case MainMenuOptions.COPY_TO_CLIPBOARD:
				await this.navigationService.navigateTo("copy-to-clipboard");
				break;

			case MainMenuOptions.SWITCH_ACCOUNT:
				await this.navigationService.navigateTo("switch-account");
				break;

			case MainMenuOptions.NETWORKS_MENU:
				await this.navigationService.navigateTo("networks-menu");
				break;
			case MainMenuOptions.SEND_TRANSACTION:
				await this.navigationService.navigateTo("send-transaction");
				break;
			case MainMenuOptions.ERC20_MENU:
				//await this.navigationService.navigateTo("erc20-menu");
				break;
			case MainMenuOptions.LOG_OUT:
				await this.navigationService.navigateTo("logout")
				break;
		}
	}
}
