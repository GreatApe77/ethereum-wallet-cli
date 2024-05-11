import { printAsciiArt } from "./utils/logs/printTitle";
import chalk from "chalk";
import path from "node:path";
import fs from "fs";
import inquirer from "inquirer";
import { printNewWalletMenu } from "./utils/logs/printNewWalletMenu";
import { ethers } from "ethers";
import {
  ImportOrCreateChoices,
  promptImportOrCreate,
} from "./utils/prompts/promptImportOrCreateWallet";
import { printMnemonic } from "./utils/logs/printMnemonic";
import { printLineSpace } from "./utils/logs/printLineSpace";
import { printSaveMnemonicAlert } from "./utils/logs/printSaveMnemonicAlert";
import { printExplainMnemonicPhrase } from "./utils/logs/printExplainMnemonicPhrase";
let wallet: ethers.HDNodeWallet | ethers.Wallet;
async function main() {
  await printAsciiArt("TermiWallet!");
  console.log(chalk.italic.bold("Your favorite Ethereum CLI!"));

  if (fs.existsSync(path.resolve(__dirname, "..", "wallet-data", "wallet.json"))) {
    printNewWalletMenu();
    const choice = await promptImportOrCreate();
    if (choice == ImportOrCreateChoices.CREATE_NEW_WALLET) {
      wallet = ethers.Wallet.createRandom();
      printLineSpace()
      printExplainMnemonicPhrase()
      printMnemonic(wallet.mnemonic?.phrase!)
      printSaveMnemonicAlert()
    } else if (choice == ImportOrCreateChoices.IMPORT) {
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
