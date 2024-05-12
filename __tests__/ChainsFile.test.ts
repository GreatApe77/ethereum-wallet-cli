import { describe, expect, it } from "vitest";
import {ChainsFile} from "../src/lib/ChainsFile"
import { Chain } from "../src/lib/Chain";

describe("ChainFile",()=>{
    it("Should create a new ChainFile",()=>{
        const chainsFile = new ChainsFile({
            lastSelectedChainId:1,
            chainsById:{
                1:new Chain({
                    name:"Ethereum",
                    nativeCurrency:"ETH",
                    chainId:1,
                    rpcUrl:"https://rpcurl.com"
                })


            }
        })
        expect(chainsFile.lastSelectedChainId).toBe(1)
        expect(chainsFile.chainsById[1].name).toBe("Ethereum")
        expect(chainsFile.chainsById[chainsFile.lastSelectedChainId].rpcUrl).toBe("https://rpcurl.com")
        
    })
})