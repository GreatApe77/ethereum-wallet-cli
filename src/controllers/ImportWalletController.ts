import { WalletRepository } from "../models/wallet/repository/WalletRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Controller } from "./Controller.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { CancelOperationException } from "../exceptions/CancelOperationException.js";
import { sleep } from "../shared/utils/sleep.js";
import { CancelOperationInformation } from "../ui/components/CancelOperationInformation.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
export class ImportWalletController implements Controller{
    
    constructor(
        private readonly importMnemonicPrompt: Prompt<{mnemonic:string}>,
        private readonly walletRepository:WalletRepository,
        private readonly createPasswordForImportedWalletPrompt:Prompt<{password:string}>,
        private readonly navigationService:Navigation
    ){}
    
    
    async handle(): Promise<void> {
        Clear.render()
        FancyDivider.render()
        FancyTitle.render("Import Wallet")
        FancyDivider.render()
        CancelOperationInformation.render()
        try {
            const {mnemonic} = await this.importMnemonicPrompt.question()
            
            const {password} = await this.createPasswordForImportedWalletPrompt.question()
            Spinner.start()
            EthersWallet.getInstance().fromMnemonic(mnemonic)
            const encryptedWallet = await EthersWallet.getInstance().encryptWallet(password)
            await this.walletRepository.saveEncryptedWallet(encryptedWallet)
            Spinner.success()
            ActionFeedback.render("Wallet Imported successfully","success")
            await sleep(1)
            console.clear()
            return await this.navigationService.navigateTo("auth")
        } catch (error) {
            if(error instanceof CancelOperationException){
                Spinner.start()
                ActionFeedback.render("Operation Cancelled","warning")
                await sleep(1)
                Spinner.success()
                return await this.navigationService.navigateTo("auth")
            }
        }
    }
}