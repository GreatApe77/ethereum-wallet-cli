import chalk from "chalk";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { IERC20Token } from "../../models/interfaces/IERC20Token.js";
type Token = IERC20Token&{
    balance:string
}
export async function promptTokensList(tokens: Token[]): Promise<any> {
  try {
    const res = await inquirer.prompt({
      type: "list",
      name: "tokens",
      message: `Select the tokens to be ${chalk.bold.green("TRANSFERRED")}:`,
      choices: tokens.map((token) => ({
        name: `${token.balance} ${chalk.bold(token.symbol)} - ${token.address}`,
        value: token.address,
      })),
    });
    return res.tokens;
  } catch (error) {
    if (error == InterruptedPrompt.EVENT_INTERRUPTED) {
      return -1;
    }
    throw new Error("Error prompt Tokens List");
  }
}