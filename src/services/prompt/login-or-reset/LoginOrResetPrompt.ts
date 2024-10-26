import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
export enum LoginOrResetPromptOptions {
    LOGIN,
    RESET,
}
export class LoginOrResetPrompt
    implements
        Prompt<{
            option: LoginOrResetPromptOptions;
        }>
{
    async question(
        
    ): Promise<{ option: LoginOrResetPromptOptions }> {
        const res = await inquirer.prompt({
            type: "list",
            name: "name",
            message: "To get started, Choose one option below:",
            choices: [
                {
                    name: "Login",
                    value: LoginOrResetPromptOptions.LOGIN,
                },
                {
                    name: "Reset Wallet",
                    value: LoginOrResetPromptOptions.RESET,
                },
            ],
        });
        return {
            option: res.name as LoginOrResetPromptOptions,
        }
    }
}