import { Network } from "../models/networks/entities/Network.js";
import { NetworkRepository } from "../models/networks/repository/NetworkRepository.js";
import { Controller } from "./Controller.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { Clear } from "../ui/components/Clear.js";
import { Spinner } from "../ui/components/Spinner.js";
import { SettingsFs } from "../models/settings/implementations/SettingsFs.js";
import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { Navigation } from "../services/navigation/Navigation.js";
import { sleep } from "../shared/utils/sleep.js";
import { ActionFeedback } from "../ui/components/ActionFeedback.js";

export class SwitchNetworkController implements Controller{
    constructor(
         private readonly networksRepository: NetworkRepository,
         private readonly switchNetworkPrompt:Prompt<{option:Network| null},Network>,

         private readonly navigationService: Navigation
    ){}
    async handle(): Promise<void> {
        Spinner.start("Loading...");
        const settings = SettingsFs.getInstance();
        const networks = await this.networksRepository.getNetworks()
        Spinner.success();
        Clear.render();
        FancyDivider.render();
        FancyTitle.render("Switch Network");
        FancyDivider.render();
        const { option } = await this.switchNetworkPrompt.question({
            // @ts-ignore
            options: networks
        });
        if(option===null){
            return await this.navigationService.navigateTo("networks-menu")
        }
        Spinner.start("Saving...");
        settings.settings.connectedChainId = option.getId()
        settings.save()
        await sleep(0.5)
        Spinner.success()
        ActionFeedback.render(`Switched to ${option.getName()}`,"success")
        await sleep(0.5)
        return await this.navigationService.navigateTo("networks-menu")


    }
}