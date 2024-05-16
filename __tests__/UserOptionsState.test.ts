import {UserOptionsState} from "../src/lib/UserOptionsState"
import {describe, expect, it} from "vitest"

describe("UserOptionsState",()=>{
    it("Should create a new UserOptionsState",()=>{
        const userOptionsState = new UserOptionsState({
            chainId:1,
            currentAccountIndex:0
        })
        expect(userOptionsState.chainId).toBe(1)
        expect(userOptionsState.currentAccountIndex).toBe(0)
    })
})