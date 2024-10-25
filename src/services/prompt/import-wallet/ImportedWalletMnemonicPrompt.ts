import inquirer from "inquirer"
import { Prompt } from "../Prompt.js"
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js"
import InterruptedPrompt from "inquirer-interrupted-prompt"

export class ImportedWalletMnemonicPrompt implements Prompt<
{
    mnemonic:string
}>{
    async question():Promise<{
        mnemonic:string
    }>{
        try {
            const res = await inquirer.prompt({
                type:"input",
                name:"mnemonic",
                message:"Your 12 word mnemonic phrase:",
                validate: (input: string) => {
                    if(input.split(" ").length !== 12){
                        return "Mnemonic phrase must be 12 words long!"
                    }
                    return true
                }
                
            })
            return {
                mnemonic:res.mnemonic as string
            }
        } catch (error) {
            if(error==InterruptedPrompt.EVENT_INTERRUPTED){
                throw new CancelOperationException()
            }
            throw new Error()
        }
        
    }
}