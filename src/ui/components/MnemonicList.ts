import chalk from "chalk"

export class MnemonicList{
    static render(phrase:string){
        phrase.split(" ").forEach((word,index)=>{
            console.log(`${index+1<10?" ":""}${index+1}. ${chalk.bgBlack.greenBright(word)}`)
       })
    }
}