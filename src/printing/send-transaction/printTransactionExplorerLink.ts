import chalk from "chalk";
import { printLineSpace } from "../../utils/printLineSpace.js";
import { printMarginLeft } from "../../utils/printMarginLeft.js";

export function printTransactionExplorerLink(blockExplorerUrl:string,transactionHash:string){

    printLineSpace()
    printMarginLeft(chalk.bgBlue.white(`${blockExplorerUrl}/tx/${transactionHash}`))
    printLineSpace()

}