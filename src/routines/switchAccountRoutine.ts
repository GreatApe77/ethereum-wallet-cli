import fs from "node:fs";
import fsp from "node:fs/promises"
import { actionFeedback } from "../components/actionFeedback.js";
import { printSwitchAccountMenu } from "../printing/switch-account/printSwitchAccountMenu.js";
import { promptSwitchAccountOptions } from "../prompts/switch-account/promptSwitchAccountOptions.js";
import { getAccount } from "../utils/getAccount.js";
import { wallet } from "./walletAuthRoutine.js";
import { userOptionsFilePath } from "../constants/paths.js";
import { mainMenuRoutine } from "./mainMenuRoutine.js";
import { UserOptionsState } from "../lib/UserOptionsState.js";
import { spinner } from "../utils/spinner.js";

export async function switchAccountRoutine() {
  let accountIndex = 0;
  let userOptionsState:UserOptionsState
  if (fs.existsSync(userOptionsFilePath)) {
    const configFile = JSON.parse(
      fs.readFileSync(userOptionsFilePath,"utf-8")
    );
    userOptionsState = new UserOptionsState(configFile);
    
    accountIndex = configFile.currentAccountIndex;
  }else{
    userOptionsState = new UserOptionsState({chainId:0,currentAccountIndex:0})

  }
  printSwitchAccountMenu(getAccount(wallet!, accountIndex).address);

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
        await fsp.writeFile(userOptionsFilePath,JSON.stringify(userOptionsState,null,2))
        spinner.success()
        actionFeedback(
            `Switched to account ${getAccount(wallet!, accountIndexChoice).address}`,
            "success"
        );
        await switchAccountRoutine();
      break;
  }
}
