import { printAsciiArt } from "./utils/printTitle";
import chalk from "chalk"
import path from "node:path"
import fs from "fs"
import inquirer from "inquirer";
async function main(){
    await printAsciiArt("TermiWallet!")
    console.log(chalk.italic.bold("Your favorite Ethereum CLI!"))

    if(fs.existsSync(path.resolve(__dirname,"..","wallet-data","wallet.json"))){
        
    }

    
    
    
}


main()
.catch((err)=>{
    console.error(err)
    process.exit(1)
})