import { Network } from "../../../models/networks/entities/Network.js";
import { Prompt, PromptProps } from "../Prompt.js";
import inquirer from "inquirer";

export class SwitchNetworkPrompt implements Prompt<{ option: Network | null },Network> {
    async question(props:PromptProps<Network>): Promise<{ option: Network | null }> {
        const networkChoices = props.options!
        const res = await inquirer.prompt({
            type: "list",
            name: "option",
            message: "Select a network",
            choices: [
                {
                    name:"Back",
                    value:-1
                },
                ...networkChoices.map((network) => ({
                    name: network.getName(),
                    value: network
                }))
            ]
        })
        return {
            option: res.option===-1?null:res.option
        }
    }
    
}