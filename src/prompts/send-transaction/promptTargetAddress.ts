import { ethers, isAddress } from "ethers";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptTargetAddress(){
    try {
        
        const res = await inquirer.prompt({
            type:"input",
            name:"targetAddress",
            message:"Target Address:",
            validate: (input:string)=>{
                if(!isAddress(input)|| input===ethers.ZeroAddress) return "Invalid Address!"
                return true
            }
    
        })
        return res.targetAddress as string
    } catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt Target Address")
        
    }
}