import { IERC20Token } from "../../models/interfaces/IERC20Token.js";
import { printMarginLeft } from "../../utils/printMarginLeft.js";

type PrintTokenInfoParams = Pick<IERC20Token,"symbol"> &{
    balance:string
}
export function printTokenInfo({balance,symbol}:PrintTokenInfoParams){

    printMarginLeft(`• ${balance} ${symbol}`)
}