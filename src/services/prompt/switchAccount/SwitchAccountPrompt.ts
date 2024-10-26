import { EthersWallet } from "../../../models/wallet/implementations/EthersWallet.js";
import { Prompt } from "../Prompt.js";
import inquirer from "inquirer";
export class SwitchAccountPrompt
	implements
		Prompt<{
			selectedAccount: number;
		}>
{
	async question(): Promise<{ selectedAccount: number }> {
		const wallet = EthersWallet.getInstance();
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
