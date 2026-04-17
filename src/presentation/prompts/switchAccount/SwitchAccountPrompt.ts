import { WalletService } from "../../../domain/services/WalletService.js";
import { Prompt } from "../Prompt.js";
import inquirer from "inquirer";
export class SwitchAccountPrompt
	implements
		Prompt<{
			selectedAccount: number;
		}>
{
    constructor(private readonly walletService: WalletService) {}
	async question(): Promise<{ selectedAccount: number }> {
		const wallet = this.walletService;
		const addresses = new Array<string>(20);
		for (let i = 0; i < addresses.length; i++) {
			addresses[i] = wallet.getAddress(i);
		}
		const res = await inquirer.prompt({
			type: "list",
			name: "choice",
			message: "Select one of the following options:",
			choices: [
				{
					name: "Back to main menu",
					value: -1,
				},
				...addresses.map((address, index) => {
					const correctNumber = index + 1;
					return {
						name: `Account ${correctNumber}${
							correctNumber < 10 ? " " : ""
						} - ${address}`,
						value: index,
					};
				}),
			],
		});
		return {
			selectedAccount: res.choice as number,
		};
	}
}
