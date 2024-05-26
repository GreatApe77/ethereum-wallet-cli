import { ethers } from "ethers"
import { menuTitle } from "../../components/menuTitle.js"
import { printLineSpace } from "../../utils/printLineSpace.js"
import { printMarginLeft } from "../../utils/printMarginLeft.js"

type SendTransactionMenuArgs={
    connectedAddress:string,
    chainName:string,
    balance:string
}
export async function printSendTransactionMenu({balance,chainName,connectedAddress}:SendTransactionMenuArgs){
    printLineSpace()
    menuTitle("Send Transaction")
    printLineSpace()
    printMarginLeft(`Current Network: ${chainName}`)
    printMarginLeft(`Current Account: ${connectedAddress}`)
    printMarginLeft(`Balance: ${balance}`)
    printLineSpace()
    printMarginLeft("Press ESC to return")
    printLineSpace()
}