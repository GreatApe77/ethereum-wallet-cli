import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { Prompt } from "../Prompt.js";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";

export class ConfirmTransactionPrompt implements Prompt<{confirmation:boolean}>{
    async question(): Promise<{ confirmation: boolean }> {
        try {
        
            const res = await inquirer.prompt({
                type:"confirm",
                name:"confirmation",
                message:"Do you want to execute this transaction?",
            })
            return {
                confirmation: res.confirmation as boolean
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()
            }
            throw new Error("Error prompt Confirmation for Execution")
            
        }
    }
}