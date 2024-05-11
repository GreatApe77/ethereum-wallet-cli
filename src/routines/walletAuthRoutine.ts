import { ethers } from "ethers";
import { walletDataPath, walletDataDir } from "../constants/paths.js";
import { printExplainMnemonicPhrase } from "../utils/logs/printExplainMnemonicPhrase.js";
import { printImportedWalletSuccess } from "../utils/logs/printImportedWalletSuccess.js";
import { printLineSpace } from "../utils/logs/printLineSpace.js";
import { printMnemonic } from "../utils/logs/printMnemonic.js";
import { printNewWalletMenu } from "../utils/logs/printNewWalletMenu.js";
import { printSaveMnemonicAlert } from "../utils/logs/printSaveMnemonicAlert.js";
import { printSuccessWalletCreation } from "../utils/logs/printSuccessWalletCreation.js";
import { promptConfirmMnemonicIsSafe } from "../utils/prompts/promptConfirmMnemonicIsSafe.js";
import { promptCreatePasswordForWallet } from "../utils/prompts/promptCreatePasswordForWallet.js";
import { promptImportOrCreate, ImportOrCreateChoices } from "../utils/prompts/promptImportOrCreateWallet.js";
import { promptLoginWalletPassword } from "../utils/prompts/promptLoginWalletPassword.js";
import { promptRequestMnemonic } from "../utils/prompts/promptRequestMnemonic.js";
import fs from "node:fs";
import { LoginOrResetWalletChoices, promptLoginOrResetWallet } from "../utils/prompts/promptLoginOrResetWallet.js";

let wallet:ethers.Wallet| ethers.HDNodeWallet | null = null;

export async function walletAuthRoutine(callbackRoutine:()=>Promise<void>){
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
            await callbackRoutine();
          } else {
            await callbackRoutine();
          }
        } else if (choice == ImportOrCreateChoices.IMPORT) {
          const mnemonic = await promptRequestMnemonic()
          wallet = ethers.Wallet.fromPhrase(mnemonic)
          
          const createdPassword = await promptCreatePasswordForWallet();
          const encryptedJsonWallet = await wallet.encrypt(createdPassword);
          if (!fs.existsSync(walletDataDir)) {
            fs.mkdirSync(walletDataDir);
          }
          fs.writeFileSync(walletDataPath, encryptedJsonWallet);
          printImportedWalletSuccess();
          await callbackRoutine();
        }
      }else if(!wallet){
        const loginOrResetChoice = await promptLoginOrResetWallet()
        if(loginOrResetChoice == LoginOrResetWalletChoices.RESET_WALLET){
          if(fs.existsSync(walletDataPath)){
            fs.rmSync(walletDataPath)
          }
          
          wallet= null
          await callbackRoutine()
        }else if(loginOrResetChoice == LoginOrResetWalletChoices.LOGIN){
          const loginPassword = await promptLoginWalletPassword();
          const jsonWallet =  fs.readFileSync(walletDataPath, "utf-8");
          wallet = await ethers.Wallet.fromEncryptedJson(jsonWallet,loginPassword)

        }
    
      }
}