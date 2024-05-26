import chalk from "chalk"
import { printMarginLeft } from "../../utils/printMarginLeft.js"
import { printLineSpace } from "../../utils/printLineSpace.js"

type ReviewTransactionParams = {
    targetAddress:string,
    targetValue:string,
    currencyTicker:string
}
export function printReviewTransaction(transactionData:ReviewTransactionParams){
    printLineSpace()
    printMarginLeft(chalk.bold("Review Transaction:"))
    printLineSpace()
    printMarginLeft(`${chalk.bold("To:")} ${transactionData.targetAddress}`)
    printMarginLeft(`${chalk.bold("Value:")} ${transactionData.targetValue} ${transactionData.currencyTicker}`)
    printLineSpace()
}