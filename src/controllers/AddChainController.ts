import { ChainIdPrompt } from "../services/prompt/add-chain/ChainIdPrompt.js";
import { ChainNamePrompt } from "../services/prompt/add-chain/ChainNamePrompt.js";
import { CurrencyTickerPrompt } from "../services/prompt/add-chain/CurrencyTickerPrompt.js";
import { RpcUrlPrompt } from "../services/prompt/add-chain/RpcUrlPrompt.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { Controller } from "./Controller.js";

export class AddChainController implements Controller {
	constructor(
		private readonly chainIdPrompt: Prompt<{ chainId: number }>,
		private readonly chainNamePrompt:Prompt<{chainName:string}>,
        private readonly currencyTickerPrompt:Prompt<{currencyTicker:string}>,
        private readonly rpcUrlPrompt:Prompt<{rpcUrl:string}>
	) {}
	async handle() {
		console.log("ADD INFORMATION ABOUT THE CHAIN YOU WANT TO ADD");
        console.log()
        const {chainId} = await this.chainIdPrompt.question()
        const {chainName} = await this.chainNamePrompt.question()
        const {currencyTicker} = await this.currencyTickerPrompt.question()
        const {rpcUrl} = await this.rpcUrlPrompt.question()
        console.log()
        console.log(`Chain id: ${chainId}`)
        console.log(`Chain Name: ${chainName}`)
        console.log(`Currency Ticker: ${currencyTicker}`)
        console.log(`RPC URL: ${rpcUrl}`)
        //save to database
        //redirect to main menu
        console.log()
        console.log("Confirm information???")
	}
}

await (new AddChainController(
    new ChainIdPrompt(),
    new ChainNamePrompt(),
    new CurrencyTickerPrompt(),
    new RpcUrlPrompt()
)

).handle()
