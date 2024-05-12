export class Chain{
    
    public name:string
    public nativeCurrency:string
    public chainId:number
    public rpcUrl:string
    constructor(props:Chain){
        this.name = props.name
        this.nativeCurrency = props.nativeCurrency
        this.chainId = props.chainId
        this.rpcUrl = props.rpcUrl
    }
}