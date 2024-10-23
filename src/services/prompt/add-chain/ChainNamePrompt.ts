import inquirer from "inquirer";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";
import { Prompt } from "../Prompt.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";
/**
 * @throws {CancelOperationException}
 */
export class ChainNamePrompt implements Prompt<{
    chainName:string
}>{
    async question(validate?: (input: string) => boolean): Promise<{ chainName: string; }> {
        try {
        
            const res = await inquirer.prompt({
                type:"input",
                name:"chainName",
                message:"Network name:",
                validate:(input:string)=>{
                    if(input.length===0) return "Required Field"
                    return true
                }
        
            })
            return {
                chainName:res.chainName as string
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()
            }
            throw new Error()
            
        }
    }

}

