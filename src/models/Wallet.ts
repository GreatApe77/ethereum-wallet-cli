
export interface Wallet{
    getBalance():Promise<bigint>
    switchAccount(accountIndex:number):Promise<void>
    generateNew():void
    login(password:string,jsonWalletString:string):Promise<void>
    import(mnemonic:string):void
    encryptWallet(password:string):Promise<string>
}