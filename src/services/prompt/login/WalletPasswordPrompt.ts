import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";

export class WalletPasswordPrompt implements Prompt<{ password: string }> {
	async question(
		validate?: (input: string) => boolean
	): Promise<{ password: string }> {
        const res = await inquirer.prompt({
            type:"password",
            name:"password",
            message:"Please enter your wallet password:",
            
        })
        return {
            password:res.password as string
        }
    }
}
