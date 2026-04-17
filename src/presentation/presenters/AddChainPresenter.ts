import { CancelOperationException } from "../../exceptions/CancelOperationException.js";
import { Network } from "../../domain/entities/Network.js";
import { NetworkRepository } from "../../domain/repositories/NetworkRepository.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { ChainIdPrompt } from "../prompts/add-chain/ChainIdPrompt.js";
import { ChainNamePrompt } from "../prompts/add-chain/ChainNamePrompt.js";
import { CurrencyTickerPrompt } from "../prompts/add-chain/CurrencyTickerPrompt.js";
import { RpcUrlPrompt } from "../prompts/add-chain/RpcUrlPrompt.js";
import { Prompt } from "../prompts/Prompt.js";
import { sleep } from "../../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { CancelOperationInformation } from "../ui/components/CancelOperationInformation.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Presenter } from "./Presenter.js";

export class AddChainPresenter implements Presenter {
	constructor(
		private readonly chainIdPrompt: Prompt<{ chainId: number }>,
		private readonly chainNamePrompt: Prompt<{ chainName: string }>,
		private readonly currencyTickerPrompt: Prompt<{ currencyTicker: string }>,
		private readonly rpcUrlPrompt: Prompt<{ rpcUrl: string }>,
        private readonly confirmAddNetworkPrompt: Prompt<{ confirmation: boolean}>,
        private readonly networkRepository: NetworkRepository,
		private readonly navigationService: Navigation
	) {}
	async handle() {
		Clear.render();
		FancyDivider.render();
		FancyTitle.render("Add Network");
		FancyDivider.render();
		CancelOperationInformation.render();
		try {
			const { chainId } = await this.chainIdPrompt.question();
			const { chainName } = await this.chainNamePrompt.question();
			const { currencyTicker } = await this.currencyTickerPrompt.question();
			const { rpcUrl } = await this.rpcUrlPrompt.question();
			
			MarginLeft.render(`Chain id: ${chainId}`);
			MarginLeft.render(`Chain Name: ${chainName}`);
			MarginLeft.render(`Currency Ticker: ${currencyTicker}`);
			MarginLeft.render(`RPC URL: ${rpcUrl}`);
            ActionFeedback.render("Confirm information?","info")
            const {confirmation} = await this.confirmAddNetworkPrompt.question()
            if(!confirmation){
                throw new CancelOperationException()
            }
            Spinner.start("Saving Network...")
            const networkToSave = new Network({
                id:chainId,
                name:chainName,
                currencyTicker,
                rpcUrl
            })
            await this.networkRepository.createNetwork(networkToSave)
            
            Spinner.success()
            ActionFeedback.render("Network Added","success")
            await sleep(0.5)
            return await this.navigationService.navigateTo("networks-menu")
			
		} catch (error) {
            if( error instanceof CancelOperationException){
                ActionFeedback.render("Operation Cancelled","warning")
                await sleep(1)
                return await this.navigationService.navigateTo("networks-menu")
            }
        }
	}
}
