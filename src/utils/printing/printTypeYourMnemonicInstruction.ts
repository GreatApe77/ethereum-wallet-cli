import chalk from "chalk";
import { printLineSpace } from "./printLineSpace.js";

export function printTypeYourMnemonicInstruction(){
    printLineSpace()
    console.log(chalk.bold.yellow("Type your mnemonic phrase separated by spaces:"))
}