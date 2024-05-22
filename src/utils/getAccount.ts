import { HDNodeWallet } from "ethers";


export function getAccount(wallet:HDNodeWallet,index:number){
    return wallet.deriveChild(index);
}