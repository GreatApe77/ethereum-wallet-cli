import fs from "node:fs/promises"
import { standardChains } from "../constants/standardChains.js"
import { Chain } from "../lib/Chain.js"
import { ChainsFile } from "../lib/ChainsFile.js"
import { savedChainsPath } from "../constants/paths.js"
export async function writeStandardChains(){
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
        lastSelectedChainId:fantomTestnet.chainId,
        chainsById:chains
   })
   
    await fs.writeFile(savedChainsPath,JSON.stringify(chainsFile,null,2))

}