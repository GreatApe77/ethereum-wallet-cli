import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";

export class WalletPasswordPrompt implements Prompt<{ password: string }> {
	async question(
		validate?: (input: string) => boolean
	): Promise<{ password: string }> {
        try {
            
            const res = await inquirer.prompt({
                type:"password",
                name:"password",
                message:"Please enter your wallet password:",
                
            })
            return {
                password:res.password as string
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()
            }
            throw new Error()
        }
    }
}
