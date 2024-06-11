import { BaseContract, Contract } from "ethers";



export interface IERC20Instance extends BaseContract{
    balanceOf(owner:string):Promise<bigint>
    decimals():Promise<bigint>
    symbol():Promise<string>
}



const abi = [
    "function balanceOf(address owner) view returns (uint)",
    "function decimals() view returns (uint)",
    "function symbol() view returns (string)"
]
export function getErc20ContractAt(target:string){
    return new Contract(target,abi) as BaseContract as IERC20Instance
}