import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
export enum MainMenuOptions {
	SWITCH_ACCOUNT,
	COPY_TO_CLIPBOARD,
	ACCOUNT_QR_CODE,
	NETWORKS_MENU,
	SEND_TRANSACTION,
	ERC20_MENU,
	LOG_OUT,
}

export class MainMenuPrompt implements Prompt<{ option: MainMenuOptions }> {
	async question(
	): Promise<{ option: MainMenuOptions }> {
		const res = await inquirer.prompt({
			type: "list",
			name: "choice",
			message: "Select one of the following options:",
			choices: [
				{
					name: "Switch Account",
					value: MainMenuOptions.SWITCH_ACCOUNT,
				},
				{
					name: "Copy to Clipboard",
					value: MainMenuOptions.COPY_TO_CLIPBOARD,
				},
				{
					name: "Account QR Code",
					value: MainMenuOptions.ACCOUNT_QR_CODE,
				},
				{
					name: "Networks Menu",
					value: MainMenuOptions.NETWORKS_MENU,
				},
				{
					name: "Send Transaction",
					value: MainMenuOptions.SEND_TRANSACTION,
				},
				{
					name: "Tokens Menu",
					value: MainMenuOptions.ERC20_MENU,
				},
				{
					name: "Log Out",
					value: MainMenuOptions.LOG_OUT,
				},
			],
		});
		return {
			option: res.choice as MainMenuOptions,
		};
	}
}
