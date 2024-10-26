import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
export class BackToMainMenuPrompt implements Prompt<{
    option:number
}> {
    async question(validate?: (input: string) => boolean): Promise<{option:number}> {
        const res =  await inquirer.prompt({
            type: "list",
            name: "choice",
            message: "Back to main menu?",
            choices: [
                {
                    name: "Yes",
                    value: 1,
                }
            ],
        });
        return {
            option: res.choice as number
        }
    }
}