import inquirer from "inquirer";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";
import { Prompt } from "../Prompt.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";
/**
 * @throws {CancelOperationException}
 */
export class ConfirmAddNetworkPrompt implements Prompt<{
    confirmation:boolean
}>{
    async question(): Promise<{ confirmation: boolean; }> {
        try {
        
            const res = await inquirer.prompt({
                type:"confirm",
                name:"confirmation",
                message:"Confirm?",
        
            })
            return {
                confirmation:res.confirmation as boolean
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()
            }
            throw new Error()
            
        }
    }

}

