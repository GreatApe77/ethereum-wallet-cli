import chalk from "chalk"
import { Table } from "console-table-printer"
export class MnemonicList{
    static render(phrase:string){
        const table = new Table({
            columns:[
                {name:"Index",alignment:"center"},

                {name:"Word",alignment:"left"},
                
            ]
        })
        const words = phrase.trim().split(" ")
        words.forEach((word,index)=>{
            table.addRow({
                Word:chalk.bold.green(word),
                Index:chalk.bold((index+1).toString())
            })
        })
        table.printTable()
    }
}