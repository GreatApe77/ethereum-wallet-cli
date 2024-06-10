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
import { addChainRoutine } from "./addChainRoutine.js";
import { sendTransactionRoutine } from "./sendTransactionRoutine.js";
import { erc20TokensMenuRoutine } from "./erc20TokensMenuRoutine.js";
let provider: ethers.JsonRpcProvider;

export async function mainMenuRoutine() {
  spinner.start();
  let userOptionsState = getUserOptionsState();
  //let accountIndex = 0;

  //chainsFile = await loadChainsFile();
  //[chainsFile,userOptionsState] = await Promise.all([loadChainsFile(),loadUserOptionsState()])
  //accountIndex = userOptionsState.currentAccountIndex
  provider = new ethers.JsonRpcProvider(
    userOptionsState.chains.chainsById[userOptionsState.chainId].rpcUrl,undefined,{staticNetwork:true}
  );
  let balance:bigint = BigInt(0)
  let fetchError:boolean = false 
  try {
    const network = await provider._detectNetwork()
    if(network.matches(userOptionsState.chainId)){

      balance = await provider.getBalance(
        getAccount(wallet!, userOptionsState.currentAccountIndex).address
      );

    }
    
  } catch (error) {
    provider.destroy()
    fetchError = true
  }
  spinner.success();
  printWalletMainMenu({
    balance: fetchError? "(Error fetching balance!)":ethers.formatEther(balance),
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
      await swithChainsRoutine();
      break;
    case MainMenuOptions.ADD_CHAIN:
      await addChainRoutine();
      break;
    case MainMenuOptions.SEND_TRANSACTION:
      await sendTransactionRoutine()
      break;
    case MainMenuOptions.NAVIGATE_TO_ERC20TOKENS_MENU:
      await erc20TokensMenuRoutine()
    default:
      break;
  }
}
