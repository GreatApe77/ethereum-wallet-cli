import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js"
import { ConfirmationPrompt } from "../services/prompt/generate-wallet/ConfirmationPrompt.js"
import { CreatePasswordPrompt } from "../services/prompt/generate-wallet/CreatePasswordPrompt.js"
import { Prompt } from "../services/prompt/Prompt.js"
import { MnemonicList } from "../ui/components/MnemonicList.js"

export class GenerateNewWalletController{
    constructor(
        private readonly confirmationPrompt: Prompt<{confirmation:boolean}>,
        private readonly createPasswordPrompt: Prompt<{password:string}>
    ){}

    async handle(){
        EthersWallet.getInstance().generateNew()
        MnemonicList.render(EthersWallet.getInstance().getMnemonic())
        const {confirmation} = await this.confirmationPrompt.question()
        if(confirmation){
            const {password} = await this.createPasswordPrompt.question()

        }else{
            console.log("YOU NEED TO CONFIRM THAT YOU STORED THE PASSWORD")
        }
    }
}

new GenerateNewWalletController(
    new ConfirmationPrompt(),
    new CreatePasswordPrompt()
).handle()