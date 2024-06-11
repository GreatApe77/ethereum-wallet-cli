import { Interface } from "ethers";


let erc20Interface:Interface



export function getErc20AbiInterface(){
    if(erc20Interface) return erc20Interface
    erc20Interface = new Interface([
        "function balanceOf(address owner) view returns (uint)",
        "function decimals() view returns (uint)",
        "function symbol() view returns (string)"
    ])
}