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
        validate?: (input: string) => boolean
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
                    name: "Reset Password",
                    value: LoginOrResetPromptOptions.RESET,
                },
            ],
        });
        return res.name as { option: LoginOrResetPromptOptions };
    }
}