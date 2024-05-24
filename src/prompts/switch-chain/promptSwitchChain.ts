import inquirer from "inquirer";
import { getUserOptionsState } from "../../constants/userOptionsStateSingleton.js";

export async function promptSwitchChainAvaiableOptions() {
    const chainChoices = getUserOptionsState().getAvaiableChains().map((chain=>{
        return {
            name: `${chain.name}:${chain.chainId}`,
            value: chain.chainId
        }
    }))
  const answer = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "Select one of the following options:",
    choices:[
        {
            name:"Back to main menu",
            value:-1
        },...chainChoices
    ]
  });
  return answer.choice as number
}

function showChainOptions(){
    const availableChains = getUserOptionsState().getAvaiableChains()
    return availableChains.map((chain)=>{
        return {
            name:chain.name,
            chainId:chain.chainId
        }
    })
}