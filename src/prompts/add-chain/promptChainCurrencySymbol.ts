import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptChainCurrency(){
    try {
        
        const res = await inquirer.prompt({
            type:"input",
            name:"chainSymbol",

            message:"Symbol (ex: ETH):",
            
        })
        return res.chainSymbol as string
    } catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt Chain Currency")

    }
}