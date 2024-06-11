import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { printLineSpace } from "../utils/printLineSpace.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";
import { promptTokenAddress } from "../prompts/import-token/promptTokenAddress.js";
import { erc20TokensMenuRoutine } from "./erc20TokensMenuRoutine.js";
import { IERC20Instance, getErc20ContractAt } from "../services/erc20Contract.js";
import { actionFeedback } from "../components/actionFeedback.js";
import { spinner } from "../utils/spinner.js";
import { promptTokenImportConfirmation } from "../prompts/import-token/promptoTokenImportConfirmation.js";
import { ethers } from "ethers";
import { printTokenInformationForConfirmation } from "../printing/import-token/printTokenInformationForConfirmation.js";
import { getErc20TokenRepository } from "../repositories/implementations/erc20-token-repository/singleton.js";
export async function importTokenRoutine() {
  menuTitle("Import a Token");
  printLineSpace();
  printMarginLeft("Provide the Information for importing a token :");
  printMarginLeft(
    `Connected Network: ${getUserOptionsState().getCurrentChain().name}`
  );
  printMarginLeft("Press ESC to return");
  printLineSpace();
  const tokenAddress = await promptTokenAddress();
  if (tokenAddress === -1) {
    await erc20TokensMenuRoutine();
  }
  let symbol: string = "";
  let decimals: bigint = BigInt(0);
  spinner.start();
  try {
    /* symbol = await getErc20ContractAt(tokenAddress as string).symbol();
    decimals = await getErc20ContractAt(tokenAddress as string).decimals(); */
    let contract = getErc20ContractAt(tokenAddress as string).connect(new ethers.JsonRpcProvider(getUserOptionsState().getCurrentChain().rpcUrl)) as IERC20Instance;
   [symbol, decimals] = await Promise.all([
      contract.symbol(),
      contract.decimals(),
    ]);
    
    spinner.success();
  } catch (error) {
    spinner.error();
    actionFeedback(
      "Invalid Token Address! Returning to import token menu!",
      "error"
    );
    await importTokenRoutine();
  }
  let numberDecimals = Number(decimals);
  printTokenInformationForConfirmation(tokenAddress as string, symbol,numberDecimals );
  const confirmation = await promptTokenImportConfirmation();
  if (confirmation) {
    spinner.start();
    await getErc20TokenRepository().save({
      address: tokenAddress as string,
      symbol,
      decimals: numberDecimals,
      chainId: getUserOptionsState().chainId,
    });
    spinner.success();
    actionFeedback("Token imported successfully!", "success");
    await erc20TokensMenuRoutine();
  } else {

    actionFeedback("Token import cancelled!", "warning");
    await importTokenRoutine();
  }
}
