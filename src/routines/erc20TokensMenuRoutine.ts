import { Interface, ethers } from "ethers";
import { menuTitle } from "../components/menuTitle.js";
import { getUserOptionsState } from "../constants/userOptionsStateSingleton.js";
import { getErc20TokenRepository } from "../repositories/implementations/erc20-token-repository/singleton.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";


export async function erc20TokensMenuRoutine() {
	menuTitle("TOKENS (ERC20)");
	let config = getUserOptionsState();
	let tokensRepository = getErc20TokenRepository();

	let tokens = (await tokensRepository.getAll()).filter(
		(token) => token.chainId === config.chainId
	);

	let provider = new ethers.JsonRpcProvider(config.getCurrentChain().rpcUrl);
	let balances = Promise.allSettled(tokens.map((token) => {
        return provider.call({
            to:token.address,
            data:
        })
    }));
	//list tokens with balances
	//show 3 options
	//1. Import Token
	//2. Remove Token
	//3. Transfer
}
