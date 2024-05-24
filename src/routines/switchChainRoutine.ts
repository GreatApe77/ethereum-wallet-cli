import { actionFeedback } from "../components/actionFeedback.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { printSwitchChainMenu } from "../printing/switch-chain/printSwitchChainMenu.js";
import { promptSwitchChainAvaiableOptions } from "../prompts/switch-chain/promptSwitchChain.js";
import { spinner } from "../utils/spinner.js";
import { mainMenuRoutine } from "./mainMenuRoutine.js";

export async function swithChainsRoutine() {
  //print switch chain menu that should contain current chain information
  //option to return to main menu
  //list of available chains
  //switch chain and save information to the user state file
  const userOptionsState = getUserOptionsState();
  const currentChain = userOptionsState.getCurrentChain();
  printSwitchChainMenu({
    chainId: currentChain.chainId,
    name:currentChain.name,
    rpcUrl:currentChain.rpcUrl,
    symbol:currentChain.nativeCurrency.symbol
  });
  const answer = await promptSwitchChainAvaiableOptions()
  if(answer===-1){
    await mainMenuRoutine()
  }else{
    spinner.start()
    userOptionsState.chainId = answer
    userOptionsState.saveCurrentInformation()
    spinner.success()
    actionFeedback("Chain Changed","success")
    await swithChainsRoutine()
  }
  
}
