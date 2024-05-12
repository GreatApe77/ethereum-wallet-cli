import fs from "node:fs/promises"
import { savedChainsPath } from "../constants/paths.js"
import { ChainsFile } from "../lib/ChainsFile.js"

export async function loadChainsFile(){
    const chainsFile = await fs.readFile(savedChainsPath,"utf-8")
    return new ChainsFile(JSON.parse(chainsFile))
}