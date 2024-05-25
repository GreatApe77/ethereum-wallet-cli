import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { getUserOptionsState } from "../../constants/userOptionsStateSingleton.js";


export async function promptChainId(){
    try {
        
        const res = await inquirer.prompt({
            type:"input",
            name:"chainId",
            validate:(input:string)=>{
                if(getUserOptionsState().chainExists(Number(input))){
                    return "Chain Already Registered!"
                }
                if(Number(input)<1){
                    return "Invalid Chain ID"
                }
                return true
            },
            message:"ChainId (ex: 4002):",
            
        })
        return Number(res.chainId)
    } catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt Chain Currency")

    }
}