import { describe, expect, it } from "vitest";
import { sum } from "../src/lib/sum";


describe("Math OPS",()=>{
    it("Should sum",()=>{
        expect(sum(4,4)).to.be.equal(8)
    })
})