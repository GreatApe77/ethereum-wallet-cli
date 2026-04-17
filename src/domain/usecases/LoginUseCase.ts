import { WalletRepository } from "../repositories/WalletRepository.js";
import { WalletService } from "../services/WalletService.js";
import { IncorrectPasswordException } from "../../exceptions/IncorrectPasswordException.js";

export class LoginUseCase {
    constructor(
        private walletRepository: WalletRepository,
        private walletService: WalletService
    ) {}

    async execute(password: string): Promise<void> {
        const encryptedWallet = await this.walletRepository.getEncryptedWallet();
        if (!encryptedWallet) {
            throw new Error("No wallet found");
        }
        await this.walletService.login(password, encryptedWallet);
    }
}
