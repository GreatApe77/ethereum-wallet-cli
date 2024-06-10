import { IERC20Token } from "../interfaces/IERC20Token.js";

export class ERC20Token implements IERC20Token{
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    chainId: number;


    constructor({name="Unknown name",symbol="UNKNOWN SYMBOL",decimals = 18,address,chainId}:IERC20Token){
        this.name = name
        this.symbol = symbol
        this.decimals = decimals
        this.address = address
        this.chainId = chainId
    }

}