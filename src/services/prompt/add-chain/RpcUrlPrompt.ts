import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { CancelOperationExcepetion } from "../../../exceptions/CancelOperationException.js";

export class RpcUrlPrompt implements Prompt<{
    rpcUrl:string
}>{
    async question(validate?: (input: string) => boolean): Promise<{ rpcUrl: string; }> {
        try {
        
            const res = await inquirer.prompt({
                type:"input",
                name:"rpcUrl",
                validate:(userInput:string)=>{
                    if(!userInput.startsWith("http")) return "Must be a valid http URL"
                    return true
                },
                message:"The RPC URL for the Network:",
                
            })
            return {
                rpcUrl:res.rpcUrl
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationExcepetion()
            }
            throw new Error("Error prompt RPC URL")
    
        }
    }
    
}