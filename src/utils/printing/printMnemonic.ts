import chalk from "chalk"

export function printMnemonic(mnemonic:string){
    mnemonic.split(" ").forEach((word,index)=>{
         console.log(`${index+1<10?" ":""}${index+1}. ${chalk.bgBlack.greenBright(word)}`)
    })
    
    
}