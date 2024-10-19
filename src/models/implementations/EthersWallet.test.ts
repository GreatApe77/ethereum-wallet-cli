
import {it,describe,vi, beforeEach, expect} from "vitest"
import {ethers} from "ethers"
import {EthersWallet} from "./EthersWallet"
import { PARENT_PATH } from "../../shared/constants/PARENT_PATH"


describe("EthersWalletImplementation",()=>{
    beforeEach(()=>{
        vi.clearAllMocks()
    })

    it("Should generate a new Wallet",()=>{
        //ARRANGE
        const mockWallet = { /* Simulate wallet object */ } as any; // Mock wallet object
        const mock_generateRandom = vi.spyOn(ethers.HDNodeWallet,"createRandom").mockReturnValue(mockWallet)
        const wallet = EthersWallet.getInstance()
        //ACT

        wallet.generateNew()
        //ASSERT
        expect(mock_generateRandom).toHaveBeenCalledWith(undefined,PARENT_PATH)
        expect(wallet["ethersWallet"]).toBe(mockWallet)
    })
})