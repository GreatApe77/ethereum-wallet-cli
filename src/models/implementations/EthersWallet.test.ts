
import {it,describe,vi, beforeEach, expect, MockInstance} from "vitest"
import {ethers} from "ethers"
import {EthersWallet} from "./EthersWallet"
import { PARENT_PATH } from "../../shared/constants/PARENT_PATH"


vi.mock("ethers")

describe("EthersWalletImplementation",()=>{
    beforeEach(()=>{
        vi.clearAllMocks()
        EthersWallet["instance"] = null
    })
    it("Should get the same instance",()=>{
        const wallet = EthersWallet.getInstance()
        const wallet2 = EthersWallet.getInstance()
        expect(wallet).toBe(wallet2)
    })
    it("Should call encrypt wallet with the correct arguments and return it",()=>{
        //ARRANGE
        const wallet = EthersWallet.getInstance()
        const encryptedWalletResultDummy = JSON.stringify({wallet:"encrypted"})
        wallet["ethersWallet"] = {
            encrypt:()=> null
        }
        const testPassword = "password123"
        //const mock_encrypt = vi.spyOn(new ethers.Wallet.createRandom())
        const encrypt_spy = vi.spyOn(EthersWallet.getInstance()["ethersWallet"],"encrypt") as MockInstance
        encrypt_spy.mockReturnValue(encryptedWalletResultDummy)

         //const mock_encrypt = vi.spyOn(ethers.HDNodeWallet,"encrypt")
        //ACT

        const result = wallet.encryptWallet(testPassword)

        //ASSERT

        expect(encrypt_spy).toHaveBeenCalledTimes(1)
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
    it("Should login with given password and jsonWallet",async ()=>{
        //ARRANGE
        const wallet = EthersWallet.getInstance()
        const dummyPassword ="password123"
        const jsonWalletString= JSON.stringify({wallet:"wallet"})
        const dummyTempWallet = {
            mnemonic:{
                phrase:"test test"
            }
        } as Partial<ethers.HDNodeWallet>
        const mockEthersWallet = {a:"a"} as any

        //ethers.Wallet.fromEncryptedJson
        const mock_fromEncryptedJson = vi.mocked(ethers.Wallet.fromEncryptedJson,{partial:true,deep:true})
        mock_fromEncryptedJson.mockResolvedValue(dummyTempWallet)
        const mock_fromPhrase = vi.mocked(ethers.HDNodeWallet.fromPhrase,{
            partial:true,
            deep:true
        })
        mock_fromPhrase.mockReturnValue(mockEthersWallet)
        //ACT
        
        await wallet.login(dummyPassword,jsonWalletString)

        //ASSERT
        expect(mock_fromEncryptedJson).toHaveBeenCalledTimes(1)
        expect(mock_fromEncryptedJson).toHaveBeenCalledWith(jsonWalletString,dummyPassword)
        expect(mock_fromPhrase).toHaveBeenCalledWith(dummyTempWallet.mnemonic?.phrase,undefined,PARENT_PATH)
        expect(wallet["ethersWallet"]).toBe(mockEthersWallet)
    })
})