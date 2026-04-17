import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { CancelOperationException } from "../../../exceptions/CancelOperationException.js";
import { Prompt, PromptProps } from "../Prompt.js";
import { ethers } from "ethers";

export class TargetValuePrompt implements Prompt<{ targetValue: string }> {
	async question({
		additionalData: { currentBalance },
	}: PromptProps): Promise<{ targetValue: string }> {
		try {
			const res = await inquirer.prompt({
				type: "input",
				name: "targetValue",
				message: "Target Value:",
				validate: (input: string) => {
					if (isNaN(Number(input))) return "Invalid Value!";
					if (ethers.parseEther(input) > currentBalance)
						return "Insufficient Balance!";
					return true;
				},
			});
			return {
				targetValue: res.targetValue as string,
			};
		} catch (error) {
			if (error == InterruptedPrompt.EVENT_INTERRUPTED) {
				throw new CancelOperationException();
			}
			throw new Error("Error prompt Target Value");
		}
	}
}
