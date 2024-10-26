import { CancelOperationException } from "../exceptions/CancelOperationException.js";
import { NetworkRepository } from "../models/networks/repository/NetworkRepository.js";
import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { CacheService } from "../services/cache/CacheService.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { formatUnits } from "../shared/utils/formatEther.js";
import { getCacheBalanceKey } from "../shared/utils/get-cache-balance-key.js";
import { sleep } from "../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Alert } from "../ui/components/Alert.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { LineBreak } from "../ui/components/LineBreak.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Controller } from "./Controller.js";

export class SendTransactionController implements Controller {
	constructor(
		private readonly TargetAddressPrompt: Prompt<{ targetAddress: string }>,
		private readonly AmountPrompt: Prompt<{ targetValue: string }>,
		private readonly confirmTransactionPrompt: Prompt<{
			confirmation: boolean;
		}>,
		private readonly cacheService: CacheService,
		private readonly networksRepository: NetworkRepository,
		private readonly navigationService: Navigation
	) {}

	async handle(): Promise<void> {
		try {
			Spinner.start("Loading...");
			const settings = SettingsFs.getInstance();
			const wallet = EthersWallet.getInstance();
			const balanceCacheKey = getCacheBalanceKey({
				accountAddress: wallet.getAddress(
					settings.settings.connectedAccountIndex
				),
				networkdId: settings.settings.connectedChainId,
				accountIndex: settings.settings.connectedAccountIndex,
			});
			let balance = this.cacheService.get<bigint>(balanceCacheKey);
			const network = await this.networksRepository.getNetworkById(
				settings.settings.connectedChainId
			);

			if (balance === null) {
				balance = await wallet.getBalance(network!.getRpcUrl());
				this.cacheService.set(balanceCacheKey, balance);
			}
			Spinner.success();
			Clear.render();
			FancyDivider.render();
			FancyTitle.render("Send Transaction");
			FancyDivider.render();
			MarginLeft.render(`Balance: ${formatUnits(balance)} ${network?.getCurrencyTicker()}`);
			MarginLeft.render("Connected Network: " + network!.getName());
            MarginLeft.render(`Moving funds from ${wallet.getAddress(settings.settings.connectedAccountIndex)}`);
            LineBreak.render()

			const { targetAddress } = await this.TargetAddressPrompt.question();
			const { targetValue } = await this.AmountPrompt.question({
                additionalData:{
                    currentBalance:balance
                }
            });
			ActionFeedback.render(`Sending ${targetValue}${
                network?.getCurrencyTicker()?network.getCurrencyTicker():"ETH"
            } to ${targetAddress}`, "info");
			Alert.render("Confirm Transaction information", "error");
			const { confirmation } =
				await this.confirmTransactionPrompt.question();
			if (!confirmation) {
				ActionFeedback.render("Transaction Cancelled", "warning");
				await sleep(1);
				return await this.navigationService.navigateTo("main-menu");
			}
			Spinner.start("Sending Transaction...");
			//Send transaction
            ActionFeedback.render("Transaction Sent", "success");
            await sleep(1);
            Spinner.success();
            await this.navigationService.navigateTo("main-menu");
		} catch (error) {
            if(error instanceof CancelOperationException){
                ActionFeedback.render("Transaction Cancelled", "warning");

                await sleep(1);
                await this.navigationService.navigateTo("main-menu");
            }
        }
	}
}
