import { ChainId } from "../types/ChainId.js"
import { Chain } from "./Chain.js"

export class ChainsFile{
    public lastSelectedChainId:ChainId
    public chainsById:Record<ChainId,Chain>
    constructor(props:ChainsFile){
        this.lastSelectedChainId = props.lastSelectedChainId
        this.chainsById = props.chainsById
    }
}


