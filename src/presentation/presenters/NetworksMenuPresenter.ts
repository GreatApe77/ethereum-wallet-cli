import { NetworkRepository } from "../../domain/repositories/NetworkRepository.js";
import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { NetworksMenuOptions } from "../prompts/networks-menu-options/NetworksMenuPrompt.js";
import { Prompt } from "../prompts/Prompt.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { LineBreak } from "../ui/components/LineBreak.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Presenter } from "./Presenter.js";

export class NetworksMenuPresenter implements Presenter {
	constructor(
        private readonly settingsRepository: SettingsRepository,
		private readonly networksRepository: NetworkRepository,
		private readonly networkMenuPrompt: Prompt<{ option: NetworksMenuOptions }>,
		private readonly navigationService: Navigation
	) {}
	async handle(): Promise<void> {
		Spinner.start("Loading...");
		const settings = this.settingsRepository;
		const currentNetwork = await this.networksRepository.getNetworkById(
			settings.settings.connectedChainId
		);
		if (!currentNetwork) {
			throw new Error("Connected Network not found");
		}
		Spinner.success();

		Clear.render();
		FancyDivider.render();
		FancyTitle.render("Networks Menu");
		FancyDivider.render();

		MarginLeft.render(`Connected Network: ${currentNetwork.getName()}`);
		MarginLeft.render(`Connected Network ID: ${currentNetwork.getId()}`);
		MarginLeft.render(
			`Connected Network RPC URL: ${currentNetwork.getRpcUrl()}`
		);
		MarginLeft.render(
			`Connected Network Currency: ${currentNetwork.getCurrencyTicker()}`
		);
		if (currentNetwork.getBlockExplorerUrl()) {
			MarginLeft.render(
				`Connected Network Block Explorer URL ${
					currentNetwork.getBlockExplorerName()
						? currentNetwork.getBlockExplorerName()
						: ""
				}: ${currentNetwork.getBlockExplorerUrl()}`
			);
		}

		LineBreak.render();
		const { option } = await this.networkMenuPrompt.question();
		switch (option) {
			case NetworksMenuOptions.SWITCH_NETWORK:
				return await this.navigationService.navigateTo("switch-network")
				break;
			case NetworksMenuOptions.ADD_NETWORK:
				return await this.navigationService.navigateTo("add-network")
				break;
			case NetworksMenuOptions.REMOVE_NETWORK:
				//return await this.networkMenuPrompt.navigateTo("main-menu")
				break;
			case NetworksMenuOptions.BACK:
				return await this.navigationService.navigateTo("main-menu");
		}
	}
}
