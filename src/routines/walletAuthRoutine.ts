import { ethers } from "ethers";
import { walletDataPath, walletDataDir, userOptionsFilePath } from "../constants/paths.js";

import { promptConfirmMnemonicIsSafe } from "../prompts/wallet-auth/promptConfirmMnemonicIsSafe.js";
import { promptCreatePasswordForWallet } from "../prompts/wallet-auth/promptCreatePasswordForWallet.js";
import {
  promptImportOrCreate,
  ImportOrCreateChoices,
} from "../prompts/wallet-auth/promptImportOrCreateWallet.js";
import { promptLoginWalletPassword } from "../prompts/wallet-auth/promptLoginWalletPassword.js";
import { promptRequestMnemonic } from "../prompts/wallet-auth/promptRequestMnemonic.js";
import fs from "node:fs";
import {
  LoginOrResetWalletChoices,
  promptLoginOrResetWallet,
} from "../prompts/wallet-auth/promptLoginOrResetWallet.js";
import { promptResetWalletConfirmation } from "../prompts/wallet-auth/promptResetWallet.js";
import { actionFeedback } from "../components/actionFeedback.js";
import { printExplainMnemonicPhrase } from "../printing/wallet-auth/printExplainMnemonicPhrase.js";
import { printImportedWalletSuccess } from "../printing/wallet-auth/printImportedWalletSuccess.js";
import { printLineSpace } from "../utils/printLineSpace.js";
import { printMnemonic } from "../printing/wallet-auth/printMnemonic.js";
import { printNewWalletMenu } from "../printing/wallet-auth/printNewWalletMenu.js";
import { printSaveMnemonicAlert } from "../printing/wallet-auth/printSaveMnemonicAlert.js";
import { printSuccessWalletCreation } from "../printing/wallet-auth/printSuccessWalletCreation.js";
import { spinner } from "../utils/spinner.js";
import { UserOptionsState } from "../lib/UserOptionsState.js";
import { PARENT_PATH } from "../constants/PARENT_PATH.js";

export let wallet:  ethers.HDNodeWallet | null = null;

export async function walletAuthRoutine() {
  if (!fs.existsSync(walletDataPath)) {
    printNewWalletMenu();
    const choice = await promptImportOrCreate();
    if (choice == ImportOrCreateChoices.CREATE_NEW_WALLET) {
      wallet = ethers.HDNodeWallet.createRandom(undefined,PARENT_PATH);
      printLineSpace();
      printExplainMnemonicPhrase();
      printMnemonic(wallet.mnemonic?.phrase!);
      printSaveMnemonicAlert();
      const storedMnemonicConfirmation = await promptConfirmMnemonicIsSafe();
      if (storedMnemonicConfirmation) {
        const createdPassword = await promptCreatePasswordForWallet();
        spinner.start()
        const encryptedJsonWallet = await wallet.encrypt(createdPassword);

        if (!fs.existsSync(walletDataDir)) {
          fs.mkdirSync(walletDataDir);
        }
        fs.writeFileSync(walletDataPath, encryptedJsonWallet);
        spinner.success()
        printSuccessWalletCreation();
        await walletAuthRoutine();
      } else {
        actionFeedback("Wallet creation cancelled","warning")
        await walletAuthRoutine();
      }
    } else if (choice == ImportOrCreateChoices.IMPORT) {
      const mnemonic = await promptRequestMnemonic();
      wallet = ethers.HDNodeWallet.fromPhrase(mnemonic,undefined,PARENT_PATH);
      
      const createdPassword = await promptCreatePasswordForWallet();
      const encryptedJsonWallet = await wallet.encrypt(createdPassword);
      if (!fs.existsSync(walletDataDir)) {
        fs.mkdirSync(walletDataDir);
      }
      fs.writeFileSync(walletDataPath, encryptedJsonWallet);
      printImportedWalletSuccess();
      await walletAuthRoutine();
    }
  } else {
    const loginOrResetChoice = await promptLoginOrResetWallet();
    if (loginOrResetChoice == LoginOrResetWalletChoices.RESET_WALLET) {
      const confirmation = await promptResetWalletConfirmation();
      if (confirmation) {
        if (fs.existsSync(walletDataPath)) {
          fs.rmSync(walletDataPath);
        }
        wallet = null;
        actionFeedback("Wallet reset successfully", "success");
        await walletAuthRoutine();
      } else {
        actionFeedback("Wallet reset cancelled", "warning");
        await walletAuthRoutine();
      }
      /* if (fs.existsSync(walletDataPath)) {
        fs.rmSync(walletDataPath);
      }

      wallet = null;
      await walletAuthRoutine(); */
    } else if (loginOrResetChoice == LoginOrResetWalletChoices.LOGIN) {
      const loginPassword = await promptLoginWalletPassword();
      spinner.start()
      const jsonWallet = fs.readFileSync(walletDataPath, "utf-8");
      wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet, loginPassword) as ethers.HDNodeWallet;
      wallet = ethers.HDNodeWallet.fromPhrase(wallet.mnemonic?.phrase!,undefined,PARENT_PATH)
     
      
      spinner.success()
    }
  }
}
