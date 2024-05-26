import { ethers } from "ethers";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { printSendTransactionMenu } from "../printing/send-transaction/printSendTransactionMenu.js";
import { getAccount } from "../utils/getAccount.js";
import { wallet } from "./walletAuthRoutine.js";

export async function sendTransactionRoutine() {
  //print transaction menu with the current account chain name and balance
  //prompt:
  // 1. toAddress
  // 2. value (in ether)
  // 3. request confirmation showing the transaction data
  // 4 execute the transaction
  const userOptionsState = getUserOptionsState();
  const account = getAccount(wallet!, userOptionsState.currentAccountIndex);
  let provider = new ethers.JsonRpcProvider(
    userOptionsState.getCurrentChain().rpcUrl
  );
  const balance = await provider.getBalance(account.address);

  printSendTransactionMenu({
    balance: ethers.formatEther(balance),
    chainName: userOptionsState.getCurrentChain().name,
    connectedAddress: account.address,
    currencyTicker: userOptionsState.getCurrentChain().nativeCurrency.symbol,
  });
}
