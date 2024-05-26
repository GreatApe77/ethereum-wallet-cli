import { ethers } from "ethers";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { printSendTransactionMenu } from "../printing/send-transaction/printSendTransactionMenu.js";
import { getAccount } from "../utils/getAccount.js";
import { wallet } from "./walletAuthRoutine.js";
import { promptTargetAddress } from "../prompts/send-transaction/promptTargetAddress.js";
import { actionFeedback } from "../components/actionFeedback.js";
import { promptTargetValue } from "../prompts/send-transaction/promptTargetValue.js";
import { promptConfirmationForExecution } from "../prompts/send-transaction/promptConfirmationForExecution.js";
import { printReviewTransaction } from "../printing/send-transaction/printReviewTransaction.js";
import { mainMenuRoutine } from "./mainMenuRoutine.js";
import { TransactionRequest } from "ethers";
import { TransactionResponse } from "ethers";

export async function sendTransactionRoutine() {
  //print transaction menu with the current account chain name and balance
  //prompt:
  // 1. toAddress
  // 2. value (in ether)
  // 3. request confirmation showing the transaction data
  // 4 execute the transaction
  // 5. Show execution Result
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
  const targetAddress = await promptTargetAddress()
  if(targetAddress==-1) {
    actionFeedback("Transaction Cancelled", "info")
  }
  const targetValue = await promptTargetValue(balance)
  if(targetValue==-1) {
    actionFeedback("Transaction Cancelled", "info")
  }

  printReviewTransaction({
    currencyTicker: userOptionsState.getCurrentChain().nativeCurrency.symbol,
    targetAddress:targetAddress as string,
    targetValue:ethers.formatEther(ethers.parseEther(targetValue as string))
  })
  const confirmation = await promptConfirmationForExecution()
  if(confirmation===false) {
    actionFeedback("Transaction Cancelled", "info")
    await sendTransactionRoutine()
  }else if(confirmation===-1){
    actionFeedback("Transaction Cancelled", "info")
    await mainMenuRoutine()
  }
  const transaction:TransactionRequest={
    to:targetAddress as string,
    value:ethers.parseEther(targetValue as string),
    chainId:userOptionsState.getCurrentChain().chainId,

  }
  let transactionResponse:TransactionResponse
  try {
    await account.connect(provider).estimateGas(transaction)
  } catch (error) {
      actionFeedback("This transaction might fail","error")
      await sendTransactionRoutine()
  }
  try {
    transactionResponse = await account.connect(provider).sendTransaction(transaction)

    await transactionResponse.wait()
  } catch (error) {
    actionFeedback("Transaction Failed","error")
  }
}
