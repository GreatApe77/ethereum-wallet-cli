import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptChainName(){
    try {
        
        const res = await inquirer.prompt({
            type:"input",
            name:"chainName",
            message:"Network name: ",
            validate:(input:string)=>{
                if(input.length===0) return "Required Field"
                return true
            }
    
        })
        return res.chainName as string
    } catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt Chain Name")
        
    }
}