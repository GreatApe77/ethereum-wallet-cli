import { WalletRepository } from "../models/wallet/repository/WalletRepository.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { Controller } from "./Controller.js";
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { Clear } from "../ui/components/Clear.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { CancelOperationException } from "../exceptions/CancelOperationException.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";
import { Spinner } from "../ui/components/Spinner.js";
import { sleep } from "../shared/utils/sleep.js";
import { IncorrectPasswordException } from "../exceptions/IncorrectPasswordException.js";
export class LoginController implements Controller {
	constructor(private readonly walletRepository: WalletRepository,private readonly navigationService:Navigation,
        private readonly passwordPrompt:Prompt<{password:string}>
    ) {}
	async handle(): Promise<void> {
        Clear.render()
        FancyDivider.render()
        FancyTitle.render("Login")
        FancyDivider.render()        
		const encryptedWallet = await this.walletRepository.getEncryptedWallet();
		if (!encryptedWallet) {
			return await this.navigationService.navigateTo("auth")
		}
        try {
            const {password} = await this.passwordPrompt.question()
            Spinner.start("Decrypting Wallet...")
            await EthersWallet.getInstance().login(password,encryptedWallet)
            Spinner.success()
            ActionFeedback.render("Wallet Decrypted","success")
            await sleep(0.5)
            await this.navigationService.navigateTo("main-menu")
        } catch (error) {
            
            if (error instanceof CancelOperationException){
                Spinner.start("Cancelling Operation")
                ActionFeedback.render("Operation Cancelled","warning")
                await sleep(1)
                Spinner.success()                
                return await this.navigationService.navigateTo("auth")
            }
            if(error instanceof IncorrectPasswordException){
                
                ActionFeedback.render("Incorrect Password","error")
                await sleep(1)
                Spinner.error()
                return await this.navigationService.navigateTo("login")
            }
        }
       
	}
}
