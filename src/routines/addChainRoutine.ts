import { actionFeedback } from "../components/actionFeedback.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { printAddChainMenu } from "../printing/add-chain/printAddChainMenu.js";
import { promptChainCurrency } from "../prompts/add-chain/promptChainCurrencySymbol.js";
import { promptChainId } from "../prompts/add-chain/promptChainId.js";
import { promptChainName } from "../prompts/add-chain/promptChainName.js";
import { promptRpcUrl } from "../prompts/add-chain/promptRpcUrl.js";
import { mainMenuRoutine } from "./mainMenuRoutine.js";

export async function addChainRoutine() {
  //print the menu information
  //prompt the chain information
  //save to the userOptions file
  printAddChainMenu();
  const chainName = await promptChainName();
  if (chainName === -1) {
    await fallBack();
  }
  const symbol = await promptChainCurrency();
  if (symbol === -1) {
    await fallBack();
  }
  const chainId = await promptChainId();
  if (chainId === -1) {
    await fallBack();
  }
  const rpcUrl = await promptRpcUrl();
  if (rpcUrl === -1) {
    await fallBack();
  }

  const userOptionsState = getUserOptionsState();

  userOptionsState.addChain({
    chainId: chainId,
    name: chainName as string,
    rpcUrl: rpcUrl as string,
    symbol: symbol as string,
  });
  userOptionsState.saveCurrentInformation()
  await mainMenuRoutine()
}

async function fallBack() {
  actionFeedback("Returning to menu", "info");
  await mainMenuRoutine();
}
