import { ethers } from "ethers";

import fs from "node:fs";
import { savedChainsPath, userOptionsFilePath } from "../constants/paths.js";
import { writeStandardChains } from "../utils/writeStandardChains.js";
import { ChainsFile } from "../lib/ChainsFile.js";
import { loadChainsFile } from "../utils/loadChainsFile.js";
import { wallet } from "./walletAuthRoutine.js";
import {
  MainMenuOptions,
  promptMainMenuOptions,
} from "../prompts/main-menu/promptMainMenuOptions.js";
import { printWalletMainMenu } from "../printing/main-menu/printWalletMainMenu.js";
import { spinner } from "../utils/spinner.js";
import { UserOptionsState } from "../lib/UserOptionsState.js";
import { writeStandardUserOptionsState } from "../utils/writeStandardUserOptions.js";
import { loadUserOptionsState } from "../utils/loadUserOptionsState.js";
let provider: ethers.JsonRpcProvider 
let chainsFile: ChainsFile 
let userOptionsState: UserOptionsState 
export async function mainMenuRoutine() {
  spinner.start()
  if (!fs.existsSync(savedChainsPath)) {
    await writeStandardChains();
  }
  if(!fs.existsSync(userOptionsFilePath)){
    await writeStandardUserOptionsState()
  }
  //chainsFile = await loadChainsFile();
  [chainsFile,userOptionsState] = await Promise.all([loadChainsFile(),loadUserOptionsState()])
  provider = new ethers.JsonRpcProvider(
    chainsFile.chainsById[userOptionsState.chainId].rpcUrl
  );

  const balance = await provider.getBalance(wallet?.address!);
  spinner.success()
  printWalletMainMenu({
    balance: ethers.formatEther(balance),
    connectedChain: chainsFile.chainsById[userOptionsState.chainId].name,
    currentAddress: wallet?.address!,
    nativeCurrency:
      chainsFile.chainsById[userOptionsState.chainId].nativeCurrency
        .symbol,
  });

  const choice = await promptMainMenuOptions();
  switch (choice) {
    case MainMenuOptions.OPTION_1:
      console.log("Option 1 selected");
      break;
    case MainMenuOptions.OPTION_2:
      console.log("Option 2 selected");
      break;
    case MainMenuOptions.OPTION_3:
      console.log("Option 3 selected");
      break;
    default:
      break;
  }
}
