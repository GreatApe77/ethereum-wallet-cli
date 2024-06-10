import { IERC20Token } from "../../../models/interfaces/IERC20Token.js";
import { IERC20TokenRepository } from "../../interfaces/IERC20TokenRepository.js";
import { erc20tokensFilePath } from "../../../constants/paths.js";
import fs from "fs/promises"
export class ERC20TokenRepository implements IERC20TokenRepository{
    
    private async readTokensFile(): Promise<IERC20Token[]> {
        try {
            const data = await fs.readFile(erc20tokensFilePath, 'utf-8');
            return JSON.parse(data);
        } catch (error:any) {
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }
    private async writeTokensFile(tokens: IERC20Token[]): Promise<void> {
        await fs.writeFile(erc20tokensFilePath, JSON.stringify(tokens, null, 2), 'utf-8');
    }

    public async save(token: IERC20Token): Promise<void> {
        const tokens = await this.readTokensFile();
        tokens.push(token)
        await this.writeTokensFile(tokens)

    }
    getAll(): Promise<IERC20Token[]> {
        return this.readTokensFile()
    }
    async delete(address: string): Promise<void> {
        let tokensBeforeDeletion = await this.readTokensFile()
        let tokensAfterDeletion = tokensBeforeDeletion.filter(token=>token.address !== address)
        await this.writeTokensFile(tokensAfterDeletion)
    }
}