import { actionFeedback } from "../components/actionFeedback.js";
import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { promptTokensToBeDeleted } from "../prompts/delete-token/promptTokensToBeDeleted.js";
import { getErc20TokenRepository } from "../repositories/implementations/erc20-token-repository/singleton.js";
import { printLineSpace } from "../utils/printLineSpace.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";
import { spinner } from "../utils/spinner.js";
import { erc20TokensMenuRoutine } from "./erc20TokensMenuRoutine.js";

export async function deleteTokenRoutine(){
    menuTitle("Remove a Token");
    printLineSpace();
    printMarginLeft(
      `Connected Network: ${getUserOptionsState().getCurrentChain().name}`
    );
    printMarginLeft("Press ESC to return");
    printLineSpace();
    const config = getUserOptionsState()
    const tokenList = (await getErc20TokenRepository().getAll()).filter(token => token.chainId === config.chainId);
    const options = await promptTokensToBeDeleted(tokenList);
    if(options === -1 || options.length === 0){
        actionFeedback("Remove Token Canceled", "info")
        await erc20TokensMenuRoutine()
        return
    }else{
        spinner.start()
        actionFeedback("Removing Tokens", "info")
        const repository = getErc20TokenRepository()
        options.map(async (address:string) => {
            await repository.delete(address)
        })
        spinner.success()
        actionFeedback("Tokens Removed!", "success")
        await erc20TokensMenuRoutine()


    }
    
}