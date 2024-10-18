import { describe, it, expect, vi, beforeEach } from "vitest";
import { ethers } from "ethers";
import { EthersWalletImplementation } from "../src/models/implementations/EthersWalletImplementation";
import { PARENT_PATH } from "../src/shared/constants/PARENT_PATH";

// Mock ethers functions
vi.mock("ethers", () => ({
    ethers: {
        Wallet: {
            fromEncryptedJson: vi.fn(),
        },
        HDNodeWallet: {
            fromPhrase: vi.fn(),
            createRandom: vi.fn(),
        },
    },
}));

describe("EthersWalletImplementation", () => {
    let walletInstance: EthersWalletImplementation;

    beforeEach(() => {
        walletInstance = EthersWalletImplementation.getInstance() as EthersWalletImplementation;
    });

    it("should return the same instance (singleton)", () => {
        const instance1 = EthersWalletImplementation.getInstance();
        const instance2 = EthersWalletImplementation.getInstance();
        expect(instance1).toBe(instance2);
    });

    it("should generate a new wallet when generateNew is called", () => {
        const mockWallet = { some: "wallet" }; // Mock wallet object
        (ethers.HDNodeWallet.createRandom as any).mockReturnValue(mockWallet);

        walletInstance.generateNew();

        expect(ethers.HDNodeWallet.createRandom).toHaveBeenCalledWith(undefined, PARENT_PATH);
        expect((walletInstance as any).ethersWallet).toBe(mockWallet);
    });

    it("should encrypt the wallet using the provided password", async () => {
        const mockEncrypt = vi.fn().mockResolvedValue("encryptedWallet");
        const mockWallet = { encrypt: mockEncrypt };

        (walletInstance as any).ethersWallet = mockWallet;

        const encrypted = await walletInstance.encryptWallet("password123");
        expect(mockEncrypt).toHaveBeenCalledWith("password123");
        expect(encrypted).toBe("encryptedWallet");
    });

    it("should login and set ethersWallet from encrypted JSON wallet", async () => {
        const mockWallet = { mnemonic: { phrase: "test-mnemonic" } };
        const mockFromEncryptedJson = vi.fn().mockResolvedValue(mockWallet);

        (ethers.Wallet.fromEncryptedJson as any).mockImplementation(mockFromEncryptedJson);
        (ethers.HDNodeWallet.fromPhrase as any).mockReturnValue(mockWallet);

        await walletInstance.login("password123", "{jsonWallet}");

        expect(ethers.Wallet.fromEncryptedJson).toHaveBeenCalledWith("{jsonWallet}", "password123");
        expect(ethers.HDNodeWallet.fromPhrase).toHaveBeenCalledWith("test-mnemonic", undefined, PARENT_PATH);
        expect((walletInstance as any).ethersWallet).toBe(mockWallet);
    });

    
});
