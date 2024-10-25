
type NetworkProps = {
    id:number
    name:string
    rpcUrl:string
    currencyTicker?:string
    blockExplorerUrl?:string
    blockExplorerName?:string,
    currencyDecimals?:number
}
export class Network{
    private  props:NetworkProps


    constructor(props:NetworkProps){

        this.props ={
            ...props,
            currencyTicker:props.currencyTicker || 'ETH',
            currencyDecimals:props.currencyDecimals || 18
        }
    }
    getId():number{
        return this.props.id
    }
    getName():string{
        return this.props.name
    }
    getRpcUrl():string{
        return this.props.rpcUrl
    }
    getCurrencyTicker():string{
        return this.props.currencyTicker as string
    }
    setCurrencyTicker(currencyTicker:string){
        this.props.currencyTicker = currencyTicker
    }
    toJSON(){
        return {
            id:this.getId(),
            name:this.getName(),
            rpcUrl:this.getRpcUrl(),
            currencyTicker:this.getCurrencyTicker(),
            blockExplorerUrl:this.getBlockExplorerUrl(),
            blockExplorerName:this.getBlockExplorerName(),
            currencyDecimals:this.getCurrencyDecimals()
        }
    }
    getCurrencyDecimals():number{
        return this.props.currencyDecimals as number
    }
    getBlockExplorerUrl():string|undefined{
        return this.props.blockExplorerUrl
    }
    getBlockExplorerName():string|undefined{
        return this.props.blockExplorerName
    }
    setBlockExplorerUrl(blockExplorerUrl:string){
        this.props.blockExplorerUrl = blockExplorerUrl
    }
    setBlockExplorerName(blockExplorerName:string){
        this.props.blockExplorerName = blockExplorerName
    }
    static fromJSON(json:any):Network{
        return new Network({
            id:json.id,
            name:json.name,
            rpcUrl:json.rpcUrl,
            currencyTicker:json.currencyTicker,
            blockExplorerUrl:json.blockExplorerUrl,
            blockExplorerName:json.blockExplorerName
        })
    }

}