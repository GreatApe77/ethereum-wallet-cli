import chalk from "chalk";
import { printLineSpace } from "../../utils/printLineSpace.js";
import { printMarginLeft } from "../../utils/printMarginLeft.js";

export function printTokenInformationForConfirmation(tokenAddress:string,symbol:string, decimals:number) {
    printLineSpace();
    printMarginLeft(chalk.bold.blueBright("Token Information:"));
    printLineSpace();
    printMarginLeft(`${chalk.bold("Token Address:")} ${tokenAddress}`);
    printMarginLeft(`${chalk.bold("Token Symbol:")} ${symbol}`);
    printMarginLeft(`${chalk.bold("Token Decimals:")} ${decimals}`);
    printLineSpace();
}