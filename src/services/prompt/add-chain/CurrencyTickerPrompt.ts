import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { CancelOperationExcepetion } from "../../../exceptions/CancelOperationException.js";

export class CurrencyTickerPrompt implements Prompt<{
    currencyTicker:string
}>{
    async question(validate?: (input: string) => boolean): Promise<{ currencyTicker: string; }> {
        try {
        
            const res = await inquirer.prompt({
                type:"input",
                name:"chainSymbol",
    
                message:"Symbol (ex: ETH):",
                
            })
            return {
                currencyTicker:res.chainSymbol as string
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationExcepetion()
            }
            throw new Error("Error prompt Chain Currency")
    
        }
    }
    
}