import { Chain } from "./Chain.js"
type ChainId = number
export class ChainsFile{
    public lastSelectedChainId:ChainId
    public chainsById:Record<ChainId,Chain>
    constructor(props:ChainsFile){
        this.lastSelectedChainId = props.lastSelectedChainId
        this.chainsById = props.chainsById
    }
}


