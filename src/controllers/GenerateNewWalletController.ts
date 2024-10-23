import { DatabaseSqlite } from "../db/implementations/DatabaseSqlite.js"
import { Database } from "../db/interfaces/Database.js"
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js"
import { WalletRepository } from "../models/wallet/repository/WalletRepository.js"
import { ConfirmationPrompt } from "../services/prompt/generate-wallet/ConfirmationPrompt.js"
import { CreatePasswordPrompt } from "../services/prompt/generate-wallet/CreatePasswordPrompt.js"
import { Prompt } from "../services/prompt/Prompt.js"
import { ActionFeedback } from "../ui/components/ActionFeedback.js"
import { ExplainMnemoincPhrase } from "../ui/components/ExplainMnemonicPhrase.js"
import { FancyTitle } from "../ui/components/FancyTitle.js"
import { MnemonicList } from "../ui/components/MnemonicList.js"
import { SaveMnemonicAlert } from "../ui/components/SaveMnemonicAlert.js"
import { Controller } from "./Controller.js"

export class GenerateNewWalletController implements Controller{
    
    constructor(
        private readonly confirmationPrompt: Prompt<{confirmation:boolean}>,
        private readonly createPasswordPrompt: Prompt<{password:string}>,
        private readonly walletRepository:WalletRepository
    ){}

    async handle(){
        EthersWallet.getInstance().generateNew()
        FancyTitle.render("Generate New Wallet")
        ExplainMnemoincPhrase.render()
        MnemonicList.render(EthersWallet.getInstance().getMnemonic())
        SaveMnemonicAlert.render()
        const {confirmation} = await this.confirmationPrompt.question()
        if(confirmation){
            const {password} = await this.createPasswordPrompt.question()
            const encryptedWallet =await  EthersWallet.getInstance().encryptWallet(password)
            await this.walletRepository.saveEncryptedWallet(encryptedWallet)
            //navigate to initial menu
        }else{
           //alert user that wallet was not saved
           //navigate to initial menu

        }
    }
}

