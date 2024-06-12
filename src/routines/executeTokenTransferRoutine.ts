import { ethers } from "ethers";
import { actionFeedback } from "../components/actionFeedback.js";
import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { IERC20Token } from "../models/interfaces/IERC20Token.js";
import { printTokenInformation } from "../printing/import-token/printTokenInformationForConfirmation.js";
import { promptTransferInformation } from "../prompts/execute-transfer/promptTransferInformation.js";
import {
  IERC20Instance,
  getErc20ContractAt,
} from "../services/erc20Contract.js";
import { printLineSpace } from "../utils/printLineSpace.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";
import { erc20TokensMenuRoutine } from "./erc20TokensMenuRoutine.js";
import { wallet } from "./walletAuthRoutine.js";
import chalk from "chalk";
import { promptConfirmation } from "../prompts/transfer-erc20-funds/promptConfirmation.js";
import { spinner } from "../utils/spinner.js";
import { printTransactionHash } from "../printing/send-transaction/printTransactionHash.js";
import { printTransactionExplorerLink } from "../printing/send-transaction/printTransactionExplorerLink.js";
import { TransactionRequest } from "ethers";
import { getAccount } from "../utils/getAccount.js";

export async function executeTokenTransferRoutine(
  token: IERC20Token,
  balance: bigint
) {
  menuTitle(`Transfer ${token.symbol}`);
  printLineSpace();
  printMarginLeft(
    `Connected Network: ${getUserOptionsState().getCurrentChain().name}`
  );
  printTokenInformation(token.address, token.symbol, Number(token.decimals));
  printMarginLeft("Press ESC to return");
  printLineSpace();

  const answerParams = await promptTransferInformation(token.symbol, balance);
  if (answerParams === -1) {
    actionFeedback(`Transfer of ${token.symbol} cancelled`, "info");
    await erc20TokensMenuRoutine();
  } else if (
    typeof answerParams === "object" &&
    "amount" in answerParams &&
    "to" in answerParams
  ) {
    const contract = getErc20ContractAt(token.address);
    
    const amount = ethers.parseEther(answerParams.amount);
    printLineSpace();
    printMarginLeft(chalk.bold(`REVIEW TRANSFER:`));
    printLineSpace();
    printMarginLeft(`From: ${wallet!.address} (You)`);
    printMarginLeft(`To: ${answerParams.to}`);
    printMarginLeft(
      `Amount: ${ethers.formatUnits(amount, token.decimals)} ${token.symbol}`
    );
    printLineSpace();
    const confirmation = await promptConfirmation();
    const config = getUserOptionsState();
    if (confirmation) {
      spinner.start();
      try {
        const transaction:TransactionRequest ={
            to:token.address,
            data:contract.interface.encodeFunctionData("transfer",[answerParams.to,amount])
        } 
        const tx = await getAccount(wallet!,config.currentAccountIndex)?.connect(new ethers.JsonRpcProvider(getUserOptionsState().getCurrentChain().rpcUrl)).sendTransaction(transaction);
        printTransactionHash(tx!.hash);
        let blockExplorerUrl = config.getCurrentChain().blockExplorerUrl;
        if(blockExplorerUrl){
            printTransactionExplorerLink(blockExplorerUrl,tx!.hash)
        }
        actionFeedback(`Transfer ${ethers.formatUnits(amount,token.decimals)} ${token.symbol} Submited! Follow the transaction hash above!`, "success");
        spinner.success();
      } catch (error) {
        console.log(error);
        spinner.error();
        actionFeedback("Error while transferring tokens", "error");
      }

      await erc20TokensMenuRoutine();
    }else{
        actionFeedback(`Transfer of ${token.symbol} cancelled`, "info");
        await erc20TokensMenuRoutine();
    }
  }
}
