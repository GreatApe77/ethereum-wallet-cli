import { ethers } from "ethers";
import { printLineSpace } from "../utils/logs/printLineSpace.js";
import { printNewWalletMenu } from "../utils/logs/printNewWalletMenu.js";
import { printWalletMainMenu } from "../utils/logs/printWalletMainMenu.js";

let provider:ethers.JsonRpcProvider | null = null;

export async function mainMenuRoutine(){
    printWalletMainMenu({
        balance:"0",
        connectedChain:"Ethereum",
        currentAddress:ethers.ZeroAddress,
        nativeCurrency:"ETH"
    })
}