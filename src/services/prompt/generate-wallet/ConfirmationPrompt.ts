import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
import { CancelOperationExcepetion } from "../../../exceptions/CancelOperationException.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";

export class ConfirmationPrompt implements Prompt<{confirmation:boolean}>{
    async question(validate?: (input: string) => boolean): Promise<{ confirmation: boolean; }> {
        try {
            
            const res = await inquirer.prompt({
                type:"confirm",
                name:"confirmation",
                message:"Please, confirm you have this MNEMONIC backed up somewhere safe",
                
            })
            return {
                confirmation:res.confirmation as boolean
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationExcepetion()

            }
            throw new Error("Error prompt confirmation")
        }
    }
    
}