import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { getErc20TokenRepository } from "../repositories/implementations/erc20-token-repository/singleton.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";

export async function erc20TokensMenuRoutine(){
    menuTitle("TOKENS (ERC20)")
    let config = getUserOptionsState()
    let tokensRepository = getErc20TokenRepository()
    
    let tokens = (await tokensRepository.getAll()).filter(token=>token.chainId===config.chainId)

    

}