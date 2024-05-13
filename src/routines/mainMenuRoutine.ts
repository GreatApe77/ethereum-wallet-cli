import { ethers } from "ethers";

import fs from "node:fs";
import { savedChainsPath } from "../constants/paths.js";
import { writeStandardChains } from "../utils/writeStandardChains.js";
import { ChainsFile } from "../lib/ChainsFile.js";
import { loadChainsFile } from "../utils/loadChainsFile.js";
import { wallet } from "./walletAuthRoutine.js";
import {
  MainMenuOptions,
  promptMainMenuOptions,
} from "../prompts/main-menu/promptMainMenuOptions.js";
import { printWalletMainMenu } from "../printing/printWalletMainMenu.js";
let provider: ethers.JsonRpcProvider | null = null;
let chainsFile: ChainsFile | null = null;
export async function mainMenuRoutine() {
  if (!fs.existsSync(savedChainsPath)) {
    await writeStandardChains();
  }
  chainsFile = await loadChainsFile();
  provider = new ethers.JsonRpcProvider(
    chainsFile.chainsById[chainsFile.lastSelectedChainId].rpcUrl
  );

  const balance = await provider.getBalance(wallet?.address!);

  printWalletMainMenu({
    balance: ethers.formatEther(balance),
    connectedChain: chainsFile.chainsById[chainsFile.lastSelectedChainId].name,
    currentAddress: wallet?.address!,
    nativeCurrency:
      chainsFile.chainsById[chainsFile.lastSelectedChainId].nativeCurrency
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
