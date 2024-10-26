import { WalletRepository } from "../models/wallet/repository/WalletRepository.js";
import { Controller } from "./Controller.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Navigation } from "../services/navigation/Navigation.js";
export class ResetWalletController implements Controller{
    
    
    constructor(
        private readonly confirmationPrompt: Prompt<{confirmation:boolean}>,
        private readonly walletRepository:WalletRepository,
        private readonly navigationService:Navigation
    ){}
    
    async handle(): Promise<void> {
        const {confirmation} = await this.confirmationPrompt.question({})
        if(confirmation){
            EthersWallet.getInstance().reset()
            await this.walletRepository.deleteEncryptedWallet()
            //alert user that wallet was reset
            //navigate to initial menu
            return await this.navigationService.navigateTo("auth")
        }
        //navigate to initial menu
        return await this.navigationService.navigateTo("auth")
        
    }
}