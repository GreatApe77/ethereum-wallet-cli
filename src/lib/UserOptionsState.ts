import { userOptionsFilePath, walletDataDir } from "../constants/paths.js";
import { standardChains } from "../constants/standardChains.js";
import { ChainId } from "../types/ChainId.js";
import { writeStandardChains } from "../utils/writeStandardChains.js";
import { Chain } from "./Chain.js";
import { ChainsFile } from "./ChainsFile.js";

import fs from "node:fs"
export class UserOptionsState{
    public chainId:ChainId
    public currentAccountIndex:number
    public chains:ChainsFile 
    constructor(){
        if(!fs.existsSync(walletDataDir)){
            fs.mkdirSync(walletDataDir)
        }
        if(!fs.existsSync(userOptionsFilePath)){
            UserOptionsState.writeStandardOptions()

        }
        let file = fs.readFileSync(userOptionsFilePath,"utf-8")
        let jsonParsed = JSON.parse(file)
        this.chainId = jsonParsed.chainId
        this.currentAccountIndex = jsonParsed.currentAccountIndex
        this.chains = jsonParsed.chains
        

    
    }
    public getCurrentChain(){
        return this.chains.chainsById[this.chainId]
    }
    public getAvaiableChains(){
        return Object.keys(this.chains.chainsById).map((chainId)=>{
            return this.chains.chainsById[Number(chainId)]
        })
    }
    public addChain(chainParams:Pick<Chain,"chainId"|"name"|"rpcUrl"> & {symbol:string}){
        if(this.chainExists(chainParams.chainId)) throw new Error("Chain Already Registered")
        const newChain = new Chain({
            chainId:chainParams.chainId,
            name:chainParams.name,
            nativeCurrency:{
                decimals:18,
                name:"Currency Name",
                symbol:chainParams.symbol
            },
            rpcUrl:chainParams.rpcUrl
        })
        this.chains.chainsById[chainParams.chainId] = newChain
        
    }
    public getChain(chainId:number){
        
        return this.chains.chainsById[chainId]
    }
    public chainExists(chainId:number){
        return Boolean(this.chains.chainsById[chainId])
    }
    public  saveCurrentInformation(){
        fs.writeFileSync(userOptionsFilePath,JSON.stringify(this,null,2))
    }
    public static   writeStandardOptions(){
        const sepolia = new Chain({
            name:standardChains.sepolia.name,
            chainId:standardChains.sepolia.id,
            nativeCurrency:standardChains.sepolia.nativeCurrency,
            rpcUrl:standardChains.sepolia.rpcUrls.default.http[0],
            blockExplorerUrl:standardChains.sepolia.blockExplorers.default.url
    
        })
        const fantomTestnet = new Chain({
            name:standardChains.fantomTestnet.name,
            chainId:standardChains.fantomTestnet.id,
            nativeCurrency:standardChains.fantomTestnet.nativeCurrency,
            rpcUrl:standardChains.fantomTestnet.rpcUrls.default.http[0],
            blockExplorerUrl:standardChains.fantomTestnet.blockExplorers.default.url
        })
        const ethereumMainnet = new Chain({
            name:standardChains.mainnet.name,
            chainId:standardChains.mainnet.id,
            nativeCurrency:standardChains.mainnet.nativeCurrency,
            rpcUrl:standardChains.mainnet.rpcUrls.default.http[0],
            blockExplorerUrl:standardChains.mainnet.blockExplorers.default.url
        })
        const localhost = "http://localhost:8545"
        const ganache = new Chain({
            name:"Ganache (Localhost)",
            chainId:1337,
            nativeCurrency:{
                decimals:18,
                name:"Ethereum",
                symbol:"ETH"
            },
            rpcUrl:localhost
        })
        const anvil = new Chain({
            name:"Anvil (Localhost)",
            chainId:31337,
            nativeCurrency:{
                decimals:18,
                name:"Ethereum",
                symbol:"ETH"
            },
            rpcUrl:localhost
        })
        const chains:Record<number,Chain> = {
            [sepolia.chainId]:sepolia,
            [fantomTestnet.chainId]:fantomTestnet,
            [ethereumMainnet.chainId]:ethereumMainnet,
            [31337]:anvil,
            1337:ganache
        }
        const chainsFile = new ChainsFile({
            
            chainsById:chains
       })
       let userOptions = {
            chainId:standardChains.sepolia.id,
            currentAccountIndex:0,
            chains:chainsFile
       } as UserOptionsState
        fs.writeFileSync(userOptionsFilePath,JSON.stringify(userOptions,null,2))
    }
    public static loadConfig():UserOptionsState{
        let file = fs.readFileSync(userOptionsFilePath,"utf-8")
        let jsonParsed = JSON.parse(file)
        return jsonParsed as UserOptionsState
    }
    
}