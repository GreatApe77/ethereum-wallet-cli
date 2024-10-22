import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { SwitchAccountPrompt } from "../services/prompt/switchAccount/SwitchAccountPrompt.js";

export class SwitchAccountController {
	constructor(
		private readonly switchAccountPrompt: Prompt<{ selectedAccount: number }>
	) {}

    async handle(){
        EthersWallet.getInstance().generateNew()
        console.log("SWITCH ACCOUNT")
        console.log("Current Account: ",EthersWallet.getInstance().getAddress(0))
        const {selectedAccount} = await this.switchAccountPrompt.question()
        EthersWallet.getInstance().switchAccount(selectedAccount)
        await this.handle()
    }

}


new SwitchAccountController(
    new SwitchAccountPrompt()
).handle()