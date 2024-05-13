import { ethers } from "ethers";
import { printLineSpace } from "../utils/printing/printLineSpace.js";
import { printNewWalletMenu } from "../utils/printing/printNewWalletMenu.js";
import { printWalletMainMenu } from "../utils/printing/printWalletMainMenu.js";
import fs from "node:fs";
import { savedChainsPath } from "../constants/paths.js";
import { writeStandardChains } from "../utils/writeStandardChains.js";
import { ChainsFile } from "../lib/ChainsFile.js";
import { loadChainsFile } from "../utils/loadChainsFile.js";
import { wallet } from "./walletAuthRoutine.js";
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
}
