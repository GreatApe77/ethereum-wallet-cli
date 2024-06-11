import { ethers } from "ethers";
import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { IERC20Token } from "../models/interfaces/IERC20Token.js";
import { promptTokensList } from "../prompts/transfer-erc20-funds/promptTokensList.js";
import { printLineSpace } from "../utils/printLineSpace.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";
import { actionFeedback } from "../components/actionFeedback.js";
import { erc20TokensMenuRoutine } from "./erc20TokensMenuRoutine.js";
import { executeTokenTransferRoutine } from "./executeTokenTransferRoutine.js";

export async function transferErc20fundsRoutine(balances:bigint[],tokens:IERC20Token[]){
    menuTitle("Transfer Tokens");
    printLineSpace();
    printMarginLeft(
      `Connected Network: ${getUserOptionsState().getCurrentChain().name}`
    );
    printMarginLeft("Press ESC to return");
    printLineSpace();
   
    const selectedToken = await promptTokensList(tokens.map((token,index)=>{
        return {
            balance:ethers.formatUnits(balances[index],token.decimals),
            address:token.address,
            symbol:token.symbol,
            chainId:token.chainId,
            decimals:token.decimals

        }
    }))

    if(selectedToken === -1){
       actionFeedback("Transfer Tokens Canceled", "warning")
       await erc20TokensMenuRoutine()
    }
    else{
        let token = tokens.find(token=>token.address === selectedToken)
        let balance = balances[tokens.indexOf(token!)]
        await executeTokenTransferRoutine(token!,balance)
    }

}