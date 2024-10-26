import { isAddress, ethers } from "ethers";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import {Prompt} from "../Prompt.js";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";

export class TargetAddressPrompt implements Prompt<{ targetAddress: string }> {
    async question(): Promise<{ targetAddress: string }> {
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
            return {
                targetAddress: res.targetAddress as string
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()
            }
            throw new Error("Error prompt Target Address")
            
        }
    }
}