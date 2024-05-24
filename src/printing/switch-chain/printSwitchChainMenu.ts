import { menuTitle } from "../../components/menuTitle.js";
import { Chain, NativeCurrency } from "../../lib/Chain.js";
import { printLineSpace } from "../../utils/printLineSpace.js";
import { printMarginLeft } from "../../utils/printMarginLeft.js";
type OptionNativeCurrency = Pick<NativeCurrency,"symbol">

export function printSwitchChainMenu(currentChain: Omit<Chain & OptionNativeCurrency,"nativeCurrency">) {
    
    menuTitle("Switch Chain")
    printLineSpace()
    printMarginLeft("Current Chain Information:")
    printLineSpace()
    printMarginLeft(`Name: ${currentChain.name}`)
    printMarginLeft(`Currency Symbol: ${currentChain.symbol}`)
    printMarginLeft(`Chain ID: ${currentChain.chainId}`)
    printMarginLeft(`RPC URL: ${currentChain.rpcUrl}`)
    printLineSpace()
}
