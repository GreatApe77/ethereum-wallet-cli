import { BaseContract, Contract, ethers } from "ethers";



export interface IERC20Instance extends BaseContract{
    balanceOf(owner:string):Promise<bigint>
    decimals():Promise<bigint>
    symbol():Promise<string>
    transfer(to:string,amount:bigint):Promise<ethers.TransactionResponse>
}



const abi = [
    "function balanceOf(address owner) view returns (uint)",
    "function decimals() view returns (uint)",
    "function symbol() view returns (string)",
    "function transfer(address to, uint amount)"
]
export function getErc20ContractAt(target:string){
    return new Contract(target,abi) as BaseContract as IERC20Instance
}