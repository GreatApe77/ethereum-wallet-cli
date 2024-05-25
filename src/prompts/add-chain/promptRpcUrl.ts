import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptRpcUrl(){
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
        return res.rpcUrl as string
    } catch (error) {
        if(error==InterruptedPrompt.EVENT_INTERRUPTED){
            return -1
        }
        throw new Error("Error prompt RPC URL")

    }
}