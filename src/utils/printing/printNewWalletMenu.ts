import { printMarginLeft } from "../printMarginLeft.js"
import { printLineSpace } from "./printLineSpace.js"

export function printNewWalletMenu(){
    printLineSpace()
    printMarginLeft("It looks like you haven't created a wallet yet. Don't worry, we'll guide you through the process!")
    printMarginLeft("Let's get started on your Ethereum journey together!")
    printLineSpace()
    
}