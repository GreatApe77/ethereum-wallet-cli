import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";

export class CreatePasswordPrompt implements Prompt<{password:string}>{
    async question(validate?: (input: string) => boolean): Promise<{ password:string; }> {
        try {
            
            const res = await inquirer.prompt({
                type:"password",
                name:"password",
                message:"Please create a secure password for your Wallet:",
                
            })
            return {
                password:res.password as string
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()

            }
            throw new Error("Error prompt confirmation")
        }
    }
    
}