import chalk from "chalk";
import { printLineSpace } from "./printLineSpace.js";

export function printSuccessWalletCreation(){
    printLineSpace()
    console.log(chalk.bold.greenBright("Wallet successfully created!"))
    printLineSpace()
}