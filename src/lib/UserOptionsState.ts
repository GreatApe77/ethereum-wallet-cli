import { userOptionsFilePath } from "../constants/paths.js";
import { standardChains } from "../constants/standardChains.js";
import { ChainId } from "../types/ChainId.js";
import { writeStandardChains } from "../utils/writeStandardChains.js";
import { Chain } from "./Chain.js";
import { ChainsFile } from "./ChainsFile.js";
import fsp from "node:fs/promises"
import fs from "node:fs"
export class UserOptionsState{
    public chainId:ChainId
    public currentAccountIndex:number
    public chains:ChainsFile 
    constructor(){
        if(!fs.existsSync(userOptionsFilePath)){
            async ()=>await UserOptionsState.writeStandardOptions()
            
        }
        let file = fs.readFileSync(userOptionsFilePath,"utf-8")
        let jsonParsed = JSON.parse(file)
        this.chainId = jsonParsed.chainId
        this.currentAccountIndex = jsonParsed.currentAccountIndex
        this.chains = jsonParsed.chains

    
    }
    public async  saveCurrentInformation(){
        await fsp.writeFile(userOptionsFilePath,JSON.stringify(this,null,2))
    }
    public static async  writeStandardOptions():Promise<void>{
        const sepolia = new Chain({
            name:standardChains.sepolia.name,
            chainId:standardChains.sepolia.id,
            nativeCurrency:standardChains.sepolia.nativeCurrency,
            rpcUrl:standardChains.sepolia.rpcUrls.default.http[0]
    
        })
        const fantomTestnet = new Chain({
            name:standardChains.fantomTestnet.name,
            chainId:standardChains.fantomTestnet.id,
            nativeCurrency:standardChains.fantomTestnet.nativeCurrency,
            rpcUrl:standardChains.fantomTestnet.rpcUrls.default.http[0]
        })
        const ethereumMainnet = new Chain({
            name:standardChains.mainnet.name,
            chainId:standardChains.mainnet.id,
            nativeCurrency:standardChains.mainnet.nativeCurrency,
            rpcUrl:standardChains.mainnet.rpcUrls.default.http[0]
        })
        const chains:Record<number,Chain> = {
            [sepolia.chainId]:sepolia,
            [fantomTestnet.chainId]:fantomTestnet,
            [ethereumMainnet.chainId]:ethereumMainnet
        }
        const chainsFile = new ChainsFile({
            
            chainsById:chains
       })
       let userOptions = {
            chainId:standardChains.sepolia.id,
            currentAccountIndex:0,
            chains:chainsFile
       } as UserOptionsState
       await fsp.writeFile(userOptionsFilePath,JSON.stringify(userOptions,null,2))
    }
}