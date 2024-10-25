import { ethers } from "ethers";

export function formatUnits(amount:bigint,decimals:number=18):string{
    return ethers.formatUnits(amount,decimals)
}