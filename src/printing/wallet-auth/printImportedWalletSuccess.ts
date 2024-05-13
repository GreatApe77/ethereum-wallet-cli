import chalk from "chalk";
import { printLineSpace } from "../../utils/printLineSpace.js";

export function printImportedWalletSuccess() {
  printLineSpace();
  console.log(chalk.bold.green("Wallet imported successfully!"));
  printLineSpace();
}
