export interface Settings{
    connectedAccountIndex:number,
    connectedChainId:number,
    needsSeed:boolean
}
export interface SettingsPersistence{
    save(settings:Settings):void
    read():void
    
}