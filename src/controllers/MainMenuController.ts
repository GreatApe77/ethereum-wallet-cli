import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { MarginLeft } from "../ui/components/MarginLeft.js";
import { Controller } from "./Controller.js";
import { NetworkRepository } from "../models/networks/repository/NetworkRepository.js";
import{Navigation} from "../services/navigation/Navigation.js"
import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import { formatUnits } from "../shared/utils/formatEther.js";
export class MainMenuController implements Controller{
    constructor(
        private readonly NetworkRepository: NetworkRepository,
        private readonly navigationService: Navigation
    ){

    }
    async handle(): Promise<void> {
        FancyDivider.render()
        FancyTitle.render("Main Menu")
        FancyDivider.render()
        //
        const settings =SettingsFs.getInstance()
        const connectedNetwork = await this.NetworkRepository.getNetworkById(settings.settings.connectedChainId)
        if(!connectedNetwork){
            throw new Error("Connected Network not found")
        }
        const balance = await EthersWallet.getInstance().getBalance(connectedNetwork?.getRpcUrl())

        //const connectedNetworkId = settings.settings.connectedChainId

        MarginLeft.render(`Connected Network: ${connectedNetwork?.getName()}`)
        MarginLeft.render(`Connected Account: ${EthersWallet.getInstance().getAddress(settings.settings.connectedAccountIndex)}`)
        MarginLeft.render(`Balance: ${formatUnits(balance,18)} ${connectedNetwork?.getCurrencyTicker()}`)
        
    }
    
}