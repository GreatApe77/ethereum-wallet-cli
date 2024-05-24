import { ethers } from "ethers";

import { wallet } from "./walletAuthRoutine.js";
import {
  MainMenuOptions,
  promptMainMenuOptions,
} from "../prompts/main-menu/promptMainMenuOptions.js";
import { printWalletMainMenu } from "../printing/main-menu/printWalletMainMenu.js";
import { spinner } from "../utils/spinner.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";

import { switchAccountRoutine } from "./switchAccountRoutine.js";
import { getAccount } from "../utils/getAccount.js";
import { swithChainsRoutine } from "./switchChainRoutine.js";
let provider: ethers.JsonRpcProvider;

export async function mainMenuRoutine() {
  spinner.start();
  let userOptionsState = getUserOptionsState();
  //let accountIndex = 0;

  //chainsFile = await loadChainsFile();
  //[chainsFile,userOptionsState] = await Promise.all([loadChainsFile(),loadUserOptionsState()])
  //accountIndex = userOptionsState.currentAccountIndex
  provider = new ethers.JsonRpcProvider(
    userOptionsState.chains.chainsById[userOptionsState.chainId].rpcUrl
  );

  const balance = await provider.getBalance(
    getAccount(wallet!, userOptionsState.currentAccountIndex).address
  );
  spinner.success();
  printWalletMainMenu({
    balance: ethers.formatEther(balance),
    connectedChain:
      userOptionsState.chains.chainsById[userOptionsState.chainId].name,
    currentAddress: getAccount(wallet!, userOptionsState.currentAccountIndex)
      .address,
    nativeCurrency:
      userOptionsState.chains.chainsById[userOptionsState.chainId]
        .nativeCurrency.symbol,
  });

  const choice = await promptMainMenuOptions();
  switch (choice) {
    case MainMenuOptions.SWITCH_ACCOUNT:
      await switchAccountRoutine();
      break;
    case MainMenuOptions.SWITCH_CHAIN:
      await swithChainsRoutine()
      break;
    case MainMenuOptions.OPTION_3:
      console.log("Option 3 selected");
      break;
    default:
      break;
  }
}
