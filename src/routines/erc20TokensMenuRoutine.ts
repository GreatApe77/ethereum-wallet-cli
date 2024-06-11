import { Interface, ethers } from "ethers";
import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { getErc20TokenRepository } from "../repositories/implementations/erc20-token-repository/singleton.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";
import { wallet } from "./walletAuthRoutine.js";
import { getAccount } from "../utils/getAccount.js";
import { printTokenInfo } from "../printing/tokens-menu/printTokenInfo.js";
import { IERC20Instance, getErc20ContractAt } from "../services/erc20Contract.js";
import { spinner } from "../utils/spinner.js";
import chalk from "chalk";
import { printLineSpace } from "../utils/printLineSpace.js";
import { TokenMenuOperations, promptOperations } from "../prompts/tokens-menu/promptOperations.js";
import { mainMenuRoutine } from "./mainMenuRoutine.js";
import { actionFeedback } from "../components/actionFeedback.js";
import { importTokenRoutine } from "./importTokenRoutine.js";


export async function erc20TokensMenuRoutine() {
    spinner.start()
	
	let config = getUserOptionsState();
	let tokensRepository = getErc20TokenRepository();

	let tokens = (await tokensRepository.getAll()).filter(
		(token) => token.chainId === config.chainId
	);

	let provider = new ethers.JsonRpcProvider(config.getCurrentChain().rpcUrl);
	let balances = Promise.allSettled(tokens.map((token) => {
        
            const contract = getErc20ContractAt(token.address)
            const account = getAccount(wallet!,config.currentAccountIndex)
            const connected = contract.connect(provider) as IERC20Instance
            return connected.balanceOf(account.address)
       
    }));
    
    const result = await balances
    spinner.success()
    menuTitle("TOKENS (ERC20)");
    if(tokens.length === 0){
        printMarginLeft(chalk.yellow("No tokens imported yet!"))
    
    }else{
        printMarginLeft(chalk.bold("Imported Tokens:"))
    }
    printLineSpace()
    tokens.forEach((token,index)=>{
        //@ts-ignore
        const promiseResult = result[index].status === "fulfilled" ? result[index].value : "ERROR"
        printTokenInfo({balance:ethers.formatUnits(promiseResult,token.decimals),symbol:token.symbol})
    })
    printLineSpace()
	//list tokens with balances
	//show 3 options
	//1. Import Token
	//2. Remove Token
	//3. Transfer
    const operation = await promptOperations()
    switch(operation){
        case TokenMenuOperations.BACK_TO_MAIN_MENU:
            actionFeedback("Returning to Main Menu","info")
            await mainMenuRoutine()
            break;
        case TokenMenuOperations.IMPORT_TOKEN:
            await importTokenRoutine()
            break;
        case TokenMenuOperations.DELETE_TOKEN:
            //delete token
            break;
        case TokenMenuOperations.TRANSFER_TOKEN:
            //transfer token
            break;
    }
}
