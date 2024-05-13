import { printAsciiArt } from "./utils/printing/printTitle.js";
import chalk from "chalk";
import path from "node:path";
import fs from "fs";

import { printNewWalletMenu } from "./utils/printing/printNewWalletMenu.js";
//import { __dirname } from "./constants/__dirname.js";
import { ethers } from "ethers";
import {
  ImportOrCreateChoices,
  promptImportOrCreate,
} from "./utils/prompts/promptImportOrCreateWallet.js";
import { printMnemonic } from "./utils/printing/printMnemonic.js";
import { printLineSpace } from "./utils/printing/printLineSpace.js";
import { printSaveMnemonicAlert } from "./utils/printing/printSaveMnemonicAlert.js";
import { printExplainMnemonicPhrase } from "./utils/printing/printExplainMnemonicPhrase.js";
import { promptConfirmMnemonicIsSafe } from "./utils/prompts/promptConfirmMnemonicIsSafe.js";
import { promptCreatePasswordForWallet } from "./utils/prompts/promptCreatePasswordForWallet.js";
import { printSuccessWalletCreation } from "./utils/printing/printSuccessWalletCreation.js";
import { promptLoginWalletPassword } from "./utils/prompts/promptLoginWalletPassword.js";
import { promptRequestMnemonic } from "./utils/prompts/promptRequestMnemonic.js";
import { printImportedWalletSuccess } from "./utils/printing/printImportedWalletSuccess.js";
import { walletDataPath, walletDataDir } from "./constants/paths.js";
import { walletAuthRoutine } from "./routines/walletAuthRoutine.js";
import { mainMenuRoutine } from "./routines/mainMenuRoutine.js";

async function main() {
  await printAsciiArt("TermiWallet!");
  console.log(chalk.italic.bold("Your favorite Ethereum CLI!"));
  await walletAuthRoutine(main);
  await mainMenuRoutine();
  //console.log(JSON.parse(jsonWallet));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
