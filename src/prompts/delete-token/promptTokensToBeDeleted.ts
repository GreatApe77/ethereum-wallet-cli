import inquirer from "inquirer";
import { IERC20Token } from "../../models/interfaces/IERC20Token.js";
import chalk from "chalk";
import InterruptedPrompt from "inquirer-interrupted-prompt";

export async function promptTokensToBeDeleted(tokens: IERC20Token[]) {
  try {
    const res = await inquirer.prompt({
      type: "checkbox",
      name: "tokens",
      message: `Select the tokens to be ${chalk.bold.red("REMOVED")}:`,
      choices: tokens.map((token) => ({
        name: `${chalk.bold(token.symbol)} - ${token.address}`,
        value: token.address,
      })),
    });
    return res.tokens;
  } catch (error) {
    if (error == InterruptedPrompt.EVENT_INTERRUPTED) {
      return -1;
    }
    throw new Error("Error prompt Tokens To Be Deleted");
  }
}
