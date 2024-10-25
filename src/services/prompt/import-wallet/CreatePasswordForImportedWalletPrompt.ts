 import inquirer from "inquirer"
import { Prompt } from "../Prompt.js"

export class CreatePasswordForImportedWalletPrompt implements Prompt<
{
    password:string
}>{
    async question():Promise<{
        password:string
    }>{
        const res = await inquirer.prompt({
            type:"password",
            name:"password",
            message:"Please create a secure password for your imported Wallet:",
            
        })
        return {
            password:res.password as string
        }
    }
}