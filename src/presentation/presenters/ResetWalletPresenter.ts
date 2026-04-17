import { WalletRepository } from "../../domain/repositories/WalletRepository.js";
import { Presenter } from "./Presenter.js";
import { Prompt } from "../prompts/Prompt.js";
import { WalletService } from "../../domain/services/WalletService.js";
import { Navigation } from "../../domain/services/Navigation.js";
export class ResetWalletPresenter implements Presenter{
    
    
    constructor(
        private readonly walletService: WalletService,
        private readonly confirmationPrompt: Prompt<{confirmation:boolean}>,
        private readonly walletRepository:WalletRepository,
        private readonly navigationService:Navigation
    ){}
    
    async handle(): Promise<void> {
        const {confirmation} = await this.confirmationPrompt.question({})
        if(confirmation){
            this.walletService.reset()
            await this.walletRepository.deleteEncryptedWallet()
            //alert user that wallet was reset
            //navigate to initial menu
            return await this.navigationService.navigateTo("auth")
        }
        //navigate to initial menu
        return await this.navigationService.navigateTo("auth")
        
    }
}