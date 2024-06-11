import { isAddress } from "ethers";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptTokenAddress() {
    try {
        const res = await inquirer.prompt({
            type: "input",
            name: "tokenAddress",
            message: "Enter the ERC20 Token Address:",
            validate: (input: string) => {
                if(!isAddress(input)){
                    return "Invalid Address"
                }
                return true
            }
        });
        return res.tokenAddress as string
    }  catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt Chain Currency")

    }
    
}