import chalk from "chalk"
import { printLineSpace } from "./printLineSpace.js"

export function printSaveMnemonicAlert(){
    printLineSpace()
    console.log(chalk.bold("Remember:"))
    printLineSpace()
    console.log("- Do not store your mnemonic phrase digitally or share it with anyone.")
    console.log("- Keep multiple copies of your mnemonic phrase in separate, secure locations.")
    console.log("- Treat your mnemonic phrase with the same level of care as you would treat your physical wallet or valuables.")
    printLineSpace()
    console.log(chalk.bold("IMPORTANT: Write down your mnemonic phrase on a piece of paper and store it in a safe and secure location."))
    printLineSpace()

}