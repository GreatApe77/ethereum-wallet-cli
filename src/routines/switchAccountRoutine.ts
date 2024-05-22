
import { actionFeedback } from "../components/actionFeedback.js";
import { printSwitchAccountMenu } from "../printing/switch-account/printSwitchAccountMenu.js";
import { promptSwitchAccountOptions } from "../prompts/switch-account/promptSwitchAccountOptions.js";
import { getAccount } from "../utils/getAccount.js";
import { wallet } from "./walletAuthRoutine.js";
import { mainMenuRoutine } from "./mainMenuRoutine.js";
import { UserOptionsState } from "../lib/UserOptionsState.js";
import { spinner } from "../utils/spinner.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";

export async function switchAccountRoutine() {
  
  let userOptionsState:UserOptionsState = getUserOptionsState()
  
  printSwitchAccountMenu(getAccount(wallet!, userOptionsState.currentAccountIndex).address);

  const accountIndexChoice = await promptSwitchAccountOptions();
  switch (accountIndexChoice) {
    case -1:
      //actionFeedback(`Switched to account ${wallet?.address}`,"success")
      actionFeedback("Returning to main menu", "info");
      await mainMenuRoutine();
      break;

    default:
        spinner.start()
        userOptionsState.currentAccountIndex = accountIndexChoice
        userOptionsState.saveCurrentInformation()
        spinner.success()
        actionFeedback(
            `Switched to account ${getAccount(wallet!, accountIndexChoice).address}`,
            "success"
        );
        await switchAccountRoutine();
      break;
  }
}
