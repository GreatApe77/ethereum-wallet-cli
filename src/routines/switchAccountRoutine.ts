import { actionFeedback } from "../components/actionFeedback.js";
import { printSwitchAccountMenu } from "../printing/switch-account/printSwitchAccountMenu.js";
import { promptSwitchAccountOptions } from "../prompts/switch-account/promptSwitchAccountOptions.js";
import { wallet } from "./walletAuthRoutine.js";



export async function switchAccountRoutine() {
    printSwitchAccountMenu(wallet?.address!)

    const accountIndexChoice = await promptSwitchAccountOptions()
    wallet?.deriveChild(accountIndexChoice)
    actionFeedback(`Switched to account ${wallet?.address}`,"success")
}