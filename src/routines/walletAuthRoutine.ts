import { ethers } from "ethers";
import { walletDataPath, walletDataDir } from "../constants/paths.js";
import { printExplainMnemonicPhrase } from "../utils/printing/printExplainMnemonicPhrase.js";
import { printImportedWalletSuccess } from "../utils/printing/printImportedWalletSuccess.js";
import { printLineSpace } from "../utils/printing/printLineSpace.js";
import { printMnemonic } from "../utils/printing/printMnemonic.js";
import { printNewWalletMenu } from "../utils/printing/printNewWalletMenu.js";
import { printSaveMnemonicAlert } from "../utils/printing/printSaveMnemonicAlert.js";
import { printSuccessWalletCreation } from "../utils/printing/printSuccessWalletCreation.js";
import { promptConfirmMnemonicIsSafe } from "../utils/prompts/wallet-auth/promptConfirmMnemonicIsSafe.js";
import { promptCreatePasswordForWallet } from "../utils/prompts/wallet-auth/promptCreatePasswordForWallet.js";
import {
  promptImportOrCreate,
  ImportOrCreateChoices,
} from "../utils/prompts/wallet-auth/promptImportOrCreateWallet.js";
import { promptLoginWalletPassword } from "../utils/prompts/wallet-auth/promptLoginWalletPassword.js";
import { promptRequestMnemonic } from "../utils/prompts/wallet-auth/promptRequestMnemonic.js";
import fs from "node:fs";
import {
  LoginOrResetWalletChoices,
  promptLoginOrResetWallet,
} from "../utils/prompts/wallet-auth/promptLoginOrResetWallet.js";
import { promptResetWalletConfirmation } from "../utils/prompts/wallet-auth/promptResetWallet.js";
import { actionFeedback } from "../components/actionFeedback.js";

export let wallet: ethers.Wallet | ethers.HDNodeWallet | null = null;

export async function walletAuthRoutine() {
  if (!fs.existsSync(walletDataPath)) {
    printNewWalletMenu();
    const choice = await promptImportOrCreate();
    if (choice == ImportOrCreateChoices.CREATE_NEW_WALLET) {
      wallet = ethers.Wallet.createRandom();
      printLineSpace();
      printExplainMnemonicPhrase();
      printMnemonic(wallet.mnemonic?.phrase!);
      printSaveMnemonicAlert();
      const storedMnemonicConfirmation = await promptConfirmMnemonicIsSafe();
      if (storedMnemonicConfirmation) {
        const createdPassword = await promptCreatePasswordForWallet();
        const encryptedJsonWallet = await wallet.encrypt(createdPassword);

        if (!fs.existsSync(walletDataDir)) {
          fs.mkdirSync(walletDataDir);
        }
        fs.writeFileSync(walletDataPath, encryptedJsonWallet);
        printSuccessWalletCreation();
        await walletAuthRoutine();
      } else {
        await walletAuthRoutine();
      }
    } else if (choice == ImportOrCreateChoices.IMPORT) {
      const mnemonic = await promptRequestMnemonic();
      wallet = ethers.Wallet.fromPhrase(mnemonic);

      const createdPassword = await promptCreatePasswordForWallet();
      const encryptedJsonWallet = await wallet.encrypt(createdPassword);
      if (!fs.existsSync(walletDataDir)) {
        fs.mkdirSync(walletDataDir);
      }
      fs.writeFileSync(walletDataPath, encryptedJsonWallet);
      printImportedWalletSuccess();
      await walletAuthRoutine();
    }
  } else{
    const loginOrResetChoice = await promptLoginOrResetWallet();
    if (loginOrResetChoice == LoginOrResetWalletChoices.RESET_WALLET) {
      const confirmation = await promptResetWalletConfirmation()
      if(confirmation){
        if (fs.existsSync(walletDataPath)) {
          fs.rmSync(walletDataPath);
        }
        wallet = null;
        actionFeedback("Wallet reset successfully", "success")
        await walletAuthRoutine();
      }else{
        actionFeedback("Wallet reset cancelled", "warning")
        await walletAuthRoutine();
      }
      /* if (fs.existsSync(walletDataPath)) {
        fs.rmSync(walletDataPath);
      }

      wallet = null;
      await walletAuthRoutine(); */
    } else if (loginOrResetChoice == LoginOrResetWalletChoices.LOGIN) {
      const loginPassword = await promptLoginWalletPassword();
      const jsonWallet = fs.readFileSync(walletDataPath, "utf-8");
      wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet, loginPassword);
    }
  }
}
