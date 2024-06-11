import { IERC20Token } from "../interfaces/IERC20Token.js";

export class ERC20Token implements IERC20Token{
    
    symbol: string;
    decimals: number;
    address: string;
    chainId: number;


    constructor({symbol="UNKNOWN SYMBOL",decimals = 18,address,chainId}:IERC20Token){
        
        this.symbol = symbol
        this.decimals = decimals
        this.address = address
        this.chainId = chainId
    }

}