import inquirer from "inquirer";
import { wallet } from "../../routines/walletAuthRoutine.js";



export async function promptSwitchAccountOptions(){
    const addresses = new Array<string>(20)
    for (let i = 0; i < addresses.length; i++) {
        addresses[i] = wallet?.deriveChild(i).address as string
        
    }
    
    const res = await inquirer.prompt({
        type:"list",
        name:"choice",
        message:"Select one of the following options:",
        choices:addresses.map((address,index)=>{
            const correctNumber = index+1
            return {
                name:`Account ${correctNumber}${correctNumber<10?" ":""} - ${address}`,
                value:index
            }
        })
        
    })
    return res.choice as number
}