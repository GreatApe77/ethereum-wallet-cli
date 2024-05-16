import fs from "node:fs/promises"
import { userOptionsFilePath } from "../constants/paths.js"
import { UserOptionsState } from "../lib/UserOptionsState.js"


export async function loadUserOptionsState(){
    const userOptionsState = await fs.readFile(userOptionsFilePath,"utf-8")
    return new UserOptionsState(JSON.parse(userOptionsState))
}