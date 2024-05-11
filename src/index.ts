import { printAsciiArt } from "./utils/logs/printTitle.js";
import chalk from "chalk";
import path from "node:path";
import fs from "fs";

import { printNewWalletMenu } from "./utils/logs/printNewWalletMenu.js";
//import { __dirname } from "./constants/__dirname.js";
import { ethers } from "ethers";
import {
  ImportOrCreateChoices,
  promptImportOrCreate,
} from "./utils/prompts/promptImportOrCreateWallet.js";
import { printMnemonic } from "./utils/logs/printMnemonic.js";
import { printLineSpace } from "./utils/logs/printLineSpace.js";
import { printSaveMnemonicAlert } from "./utils/logs/printSaveMnemonicAlert.js";
import { printExplainMnemonicPhrase } from "./utils/logs/printExplainMnemonicPhrase.js";
import { promptConfirmMnemonicIsSafe } from "./utils/prompts/promptConfirmMnemonicIsSafe.js";
import { promptCreatePasswordForWallet } from "./utils/prompts/promptCreatePasswordForWallet.js";
import { printSuccessWalletCreation } from "./utils/logs/printSuccessWalletCreation.js";
let wallet: ethers.HDNodeWallet | ethers.Wallet;

const walletDataPath = path.resolve( "wallet-data", "wallet.json");
const walletDataDir = path.resolve(  "wallet-data");
async function main() {
  await printAsciiArt("TermiWallet!");
  console.log(chalk.italic.bold("Your favorite Ethereum CLI!"));
  
  if (!fs.existsSync(walletDataPath)) {
    printNewWalletMenu();
    const choice = await promptImportOrCreate();
    if (choice == ImportOrCreateChoices.CREATE_NEW_WALLET) {
      wallet = ethers.Wallet.createRandom();
      printLineSpace()
      printExplainMnemonicPhrase()
      printMnemonic(wallet.mnemonic?.phrase!)
      printSaveMnemonicAlert()
      const storedMnemonicConfirmation = await promptConfirmMnemonicIsSafe()
      if(storedMnemonicConfirmation){
        const createdPassword = await promptCreatePasswordForWallet()
        const encryptedJsonWallet = await wallet.encrypt(createdPassword)
        
        if(!fs.existsSync(walletDataDir)){
          fs.mkdirSync(walletDataDir)
        }
        fs.writeFileSync(walletDataPath,encryptedJsonWallet)
        printSuccessWalletCreation()
        main()
      }else{
        main()
      }
    } else if (choice == ImportOrCreateChoices.IMPORT) {
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
