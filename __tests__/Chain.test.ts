import {Chain} from "../src/lib/Chain"
import {describe, expect, it} from "vitest"

describe('Chain', () => {
    it("should create a new Chain", () => {
        const chain = new Chain({
            chainId: 1,
            name: "Ethereum",
            nativeCurrency: "ETH",
            rpcUrl: "https:rpcurl.com"
        })
        expect(chain.chainId).toBe(1)
        expect(chain.name).toBe("Ethereum")
        expect(chain.nativeCurrency).toBe("ETH")
        expect(chain.rpcUrl).toBe("https:rpcurl.com")
    })
 })