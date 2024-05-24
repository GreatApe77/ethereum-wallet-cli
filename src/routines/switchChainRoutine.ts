import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { printSwitchChainMenu } from "../printing/switch-chain/printSwitchChainMenu.js";
import { promptSwitchChainAvaiableOptions } from "../prompts/switch-chain/promptSwitchChain.js";

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
  console.log(answer)
}
