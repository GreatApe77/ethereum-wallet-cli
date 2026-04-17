import inquirer from "inquirer";
import { Network } from "../../../domain/entities/Network.js";
import { Prompt, PromptProps } from "../Prompt.js";
export enum NetworksMenuOptions {
    SWITCH_NETWORK,
    ADD_NETWORK ,
    REMOVE_NETWORK, 
    BACK 
}
export class NetworksMenuPrompt implements Prompt<{option:NetworksMenuOptions}>{
    async question(props?: PromptProps): Promise<{ option: NetworksMenuOptions; }> {
        const res = await inquirer.prompt({
            type:"list",
            name:"option",
            message:"Networks Menu",
            choices:[
                {
                    name:"Switch Network",
                    value:NetworksMenuOptions.SWITCH_NETWORK
                },
                {
                    name:"Add Network",
                    value:NetworksMenuOptions.ADD_NETWORK
                },
                {
                    name:"Remove Network",
                    value:NetworksMenuOptions.REMOVE_NETWORK
                },
                {
                    name:"Back",
                    value:NetworksMenuOptions.BACK
                }
            ]
        })
        return {
            option:res.option as NetworksMenuOptions
        }

    }
   
   
}