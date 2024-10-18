import { EthersWalletImplementation } from "../src/models/implementations/EthersWalletImplementation";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ethers } from "ethers";
import { PARENT_PATH } from "../src/shared/constants/PARENT_PATH";

describe("EthersWalletImplementation - Test suite", () => {
	beforeEach(() => {
		(EthersWalletImplementation as any).instance = null;
		vi.clearAllMocks(); // Reset all mocks
	});
	it("Should create a new Wallet instance using singleton pattern", () => {
		const walletInstance = EthersWalletImplementation.getInstance();
		const walletInstanceN2 = EthersWalletImplementation.getInstance();
		expect(walletInstance).toBe(walletInstanceN2);
	});
	it("Should generate a new Wallet", () => {
		const spy = vi.spyOn(ethers.HDNodeWallet, "createRandom").mockReturnValue({
			//@ts-ignore
			mnemonic: {
				phrase: "OPA OPA",
			},
		});
		EthersWalletImplementation.getInstance().generateNew();
        //@ts-ignore
		//console.log(EthersWalletImplementation.getInstance().ethersWallet.mnemonic.phrase==="OPA OPA")
        
        expect(spy).toHaveBeenCalled();
		expect(spy).toHaveBeenCalledTimes(1);
        //@ts-ignore
        expect(EthersWalletImplementation.getInstance().ethersWallet.mnemonic.phrase==="OPA OPA")
	});
    it("should encrypt the wallet", async ()=>{
        //@ts-ignore
        const spy = vi.spyOn(ethers.HDNodeWallet,"encrypt").mockReturnValue(JSON.stringify({
			//@ts-ignore
			wallet:"ENCRYPTED"
		}))
        const wallet = EthersWalletImplementation.getInstance()
        const password = "senha123456"
        const encryptedWallet = await  wallet.encryptWallet(password)
		expect(JSON.parse(encryptedWallet).wallet).toBe("ENCRYPTED")
        expect(spy).toHaveBeenCalled()
        
    })
});
