import { ethers } from "ethers"
import { menuTitle } from "../../components/menuTitle.js"
import { printLineSpace } from "../../utils/printLineSpace.js"
import { printMarginLeft } from "../../utils/printMarginLeft.js"
import chalk from "chalk"

type SendTransactionMenuArgs={
    connectedAddress:string,
    chainName:string,
    balance:string,
    currencyTicker:string
}
export async function printSendTransactionMenu({balance,chainName,connectedAddress,currencyTicker="ETH"}:SendTransactionMenuArgs){
    printLineSpace()
    menuTitle("Send Transaction")
    printLineSpace()
    printMarginLeft(`Current Network: ${chainName}`)
    printMarginLeft(`Current Account: ${connectedAddress}`)
    printMarginLeft(`Balance: ${balance} ${chalk.bold(currencyTicker)}`)
    printLineSpace()
    printMarginLeft("Press ESC to return")
    printLineSpace()
}