import fs from "node:fs/promises"
import { userOptionsFilePath } from "../constants/paths.js"
import { UserOptionsState } from "../lib/UserOptionsState.js"
import { standardChains } from "../constants/standardChains.js"

export async function writeStandardUserOptionsState(){
    const standardOptions = new UserOptionsState({
        chainId:standardChains.sepolia.id,
        currentAccountIndex:0
    })
    await fs.writeFile(userOptionsFilePath,JSON.stringify(standardOptions,null,2))
}