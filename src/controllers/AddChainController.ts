import { CancelOperationException } from "../exceptions/CancelOperationException.js";
import { Network } from "../models/networks/entities/Network.js";
import { NetworkRepository } from "../models/networks/repository/NetworkRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { ChainIdPrompt } from "../services/prompt/add-chain/ChainIdPrompt.js";
import { ChainNamePrompt } from "../services/prompt/add-chain/ChainNamePrompt.js";
import { CurrencyTickerPrompt } from "../services/prompt/add-chain/CurrencyTickerPrompt.js";
import { RpcUrlPrompt } from "../services/prompt/add-chain/RpcUrlPrompt.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { sleep } from "../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { CancelOperationInformation } from "../ui/components/CancelOperationInformation.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Spinner } from "../ui/components/Spinner.js";
import { Controller } from "./Controller.js";

export class AddChainController implements Controller {
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
