import { EthersWallet } from "../models/wallet/implementations/EthersWallet.js";
import {
	CreateOrImportPrompt,
	CreateOrImportPromptOptions,
} from "../services/prompt/create-or-import/CreateOrImportPrompt.js";
import { LoginOrResetPromptOptions } from "../services/prompt/login-or-reset/LoginOrResetPrompt.js";
import { Prompt } from "../services/prompt/Prompt.js";
import { Controller } from "./Controller.js";

export class AuthController implements Controller{
	constructor(
		private readonly createOrImportPrompt: Prompt<{
			option: CreateOrImportPromptOptions;
		}>,
        private readonly loginOrResetPrompt: Prompt<{
            option: LoginOrResetPromptOptions;
        }>
	) {}
	async handle(): Promise<void> {
        
		const { option } = await this.createOrImportPrompt.question();
		switch (option) {
			case CreateOrImportPromptOptions.CREATE:
				console.log("Create a new wallet");
				break;
			case CreateOrImportPromptOptions.IMPORT:
				console.log("Import an existing wallet");
				break;
		}
	}
}


