import { ethers } from "ethers";
import { printLineSpace } from "../utils/logs/printLineSpace.js";
import { printNewWalletMenu } from "../utils/logs/printNewWalletMenu.js";
import { printWalletMainMenu } from "../utils/logs/printWalletMainMenu.js";
import fs from "node:fs"
let provider:ethers.JsonRpcProvider | null = null;

export async function mainMenuRoutine(){
    //if(!fs.existsSync())
    printWalletMainMenu({
        balance:"0",
        connectedChain:"Ethereum",
        currentAddress:ethers.ZeroAddress,
        nativeCurrency:"ETH"
    })
}