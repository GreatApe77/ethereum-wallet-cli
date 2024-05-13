import chalk from "chalk";
import { printLineSpace } from "./printLineSpace.js";

export function printExplainMnemonicPhrase(){
    console.log(chalk.bold(" Your wallet's security is primarily dependent on a unique phrase called a mnemonic (or seed) phrase.\n This sequence of words acts as a master key, granting access to your wallet and all its associated funds."))
    printLineSpace()
}