import { ChainId } from "../types/ChainId.js";

export class UserOptionsState{
    public chainId:ChainId
    public currentAccountIndex:number
    constructor(options:UserOptionsState){
        this.chainId = options.chainId;
        this.currentAccountIndex = options.currentAccountIndex    
    
    }
}