import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Controller } from "./Controller.js";
import { NetworkRepository } from "../models/networks/repository/NetworkRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { formatUnits } from "../shared/utils/formatEther.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { MainMenuOptions } from "../services/prompt/main-menu-options/MainMenuPrompt.js";
import { CacheService } from "../services/cache/CacheService.js";
export class MainMenuController implements Controller {
	constructor(
		private readonly NetworkRepository: NetworkRepository,
		private readonly navigationService: Navigation,
		private readonly mainMenuPrompt: Prompt<{ option: MainMenuOptions }>,
		private readonly cacheService:CacheService
	) {}
	async handle(): Promise<void> {
		Clear.render();
		Spinner.start("Loading...");
		const settings = SettingsFs.getInstance();
		const connectedNetwork = await this.NetworkRepository.getNetworkById(
			settings.settings.connectedChainId
		);
		if (!connectedNetwork) {
			throw new Error("Connected Network not found");
		}
		// const balanceCached = this.cacheService.get<bigint>("balance")
		// let balance:bigint
		
		//  const balance = await EthersWallet.getInstance().getBalance(
		//  	connectedNetwork?.getRpcUrl()
		//  );
		let balance = this.cacheService.get<bigint>(`${settings.settings.connectedChainId}-${settings.settings.connectedAccountIndex}-balance`)
		
		if(balance===null){
			balance = await EthersWallet.getInstance().getBalance(
				connectedNetwork.getRpcUrl()
			)
			this.cacheService.set(
				`${settings.settings.connectedChainId}-${settings.settings.connectedAccountIndex}-balance`
				,balance)
		}

		Spinner.success();
		Clear.render();
		FancyDivider.render();
		FancyTitle.render("Main Menu");
		FancyDivider.render();

		//const connectedNetworkId = settings.settings.connectedChainId

		MarginLeft.render(`Connected Network: ${connectedNetwork?.getName()}`);
		MarginLeft.render(
			`Connected Account: ${EthersWallet.getInstance().getAddress(
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
				//await this.navigationService.navigateTo("send-transaction");
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
