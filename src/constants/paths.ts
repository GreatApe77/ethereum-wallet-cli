import path from "node:path";
import fs from "node:fs";
import { getRootDir } from "../utils/pathUtils.js";

const rootDir = getRootDir();
const dataDir = path.resolve(rootDir, "wallet-data");

if (!fs.existsSync(dataDir)) {
	fs.mkdirSync(dataDir, { recursive: true });
}

export const walletDataPath = path.join(dataDir, "wallet.json");
export const savedChainsPath = path.join(dataDir, "chains.json");
export const userOptionsFilePath = path.join(dataDir, "options.json");
export const erc20tokensFilePath = path.join(dataDir, "erc20tokens.json")
export const walletDataDir = dataDir;
