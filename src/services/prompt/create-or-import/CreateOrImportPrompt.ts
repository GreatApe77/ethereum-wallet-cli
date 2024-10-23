import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";

export enum CreateOrImportPromptOptions {
	CREATE,
	IMPORT,
}
export class CreateOrImportPrompt
	implements
		Prompt<{
			option: CreateOrImportPromptOptions;
		}>
{
	async question(
		validate?: (input: string) => boolean
	): Promise<{ option: CreateOrImportPromptOptions }> {
		const res = await inquirer.prompt({
			type: "list",
			name: "name",
			message: "To get started, Choose one option below:",
			choices: [
				{
					name: "Create a new wallet",
					value: CreateOrImportPromptOptions.CREATE,
				},
				{
					name: "Import an existing wallet",
					value: CreateOrImportPromptOptions.IMPORT,
				},
			],
		});
		return res.name as { option: CreateOrImportPromptOptions };
	}
}
