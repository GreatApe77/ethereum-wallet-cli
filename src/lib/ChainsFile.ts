import { ChainId } from "../types/ChainId.js"
import { Chain } from "./Chain.js"

export class ChainsFile{
    
    public chainsById:Record<ChainId,Chain>
    constructor(props:ChainsFile){
        
        this.chainsById = props.chainsById
    }
}


