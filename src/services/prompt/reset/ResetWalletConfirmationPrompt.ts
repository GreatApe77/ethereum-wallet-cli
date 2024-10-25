import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";

export class ResetWalletConfirmationPrompt implements Prompt<{
    confirmation: boolean;
}>{

    async question():Promise<{confirmation:boolean}>{
        const res = await inquirer.prompt({
            type:"confirm",
            default:false,
            name:"confirmation",
            message:"Are you sure you want to reset your wallet? This will delete all your data and you will have to create a new wallet",
        })
        return {
            confirmation: res.confirmation as boolean
        }
    }
  
}