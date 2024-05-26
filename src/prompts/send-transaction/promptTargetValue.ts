import { ethers } from "ethers";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptTargetValue(currentBalance:bigint){
    try {
        
        const res = await inquirer.prompt({
            type:"input",
            name:"targetValue",
            message:"Target Value:",
            validate: (input:string)=>{
                if(isNaN(Number(input))) return "Invalid Value!"
                if(ethers.parseEther(input)>currentBalance) return "Insufficient Balance!"
                return true
            }
    
        })
        return res.targetValue as string
    } catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt Target Value")
        
    }

}