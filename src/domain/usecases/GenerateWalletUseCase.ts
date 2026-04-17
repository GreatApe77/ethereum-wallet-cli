import { WalletRepository } from "../repositories/WalletRepository.js";
import { WalletService } from "../services/WalletService.js";

export class GenerateWalletUseCase {
    constructor(
        private walletRepository: WalletRepository,
        private walletService: WalletService
    ) {}

    async execute(password: string): Promise<void> {
        const encryptedWallet = await this.walletService.encryptWallet(password);
        await this.walletRepository.saveEncryptedWallet(encryptedWallet);
    }
}
