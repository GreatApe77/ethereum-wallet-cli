import chalk from "chalk"
import { printLineSpace } from "./printLineSpace.js"

type MenuProps = {
    connectedChain: string
    currentAddress: string
    balance: string,
    nativeCurrency: string
}
export function printWalletMainMenu(props:MenuProps) {
    console.log(chalk.bold("===== Wallet Main Menu ====="))
    printLineSpace()
    console.log(`Connected Chain: ${props.connectedChain}`)
    console.log(`Current Address: ${props.currentAddress}`)
    console.log(`Balance: ${props.balance} ${chalk.bold(props.nativeCurrency)}`)
}