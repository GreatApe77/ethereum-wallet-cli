import chalk from "chalk";
import { printLineSpace } from "../../utils/printLineSpace.js";
import { printMarginLeft } from "../../utils/printMarginLeft.js";

export function printTransactionHash(transactionHash:string){
    printLineSpace()
    printMarginLeft(`${chalk.bold("Transaction Hash: ")}${chalk.hex("#c002fa")(transactionHash)}`)
    printLineSpace()
    
}