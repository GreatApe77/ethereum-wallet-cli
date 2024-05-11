import inquirer from "inquirer";

export async function promptConfirmMnemonicIsSafe(){
    const res = await inquirer.prompt({
        type:"confirm",
        name:"confirmation",
        message:"Please, confirm you have this MNEMONIC backed up somewhere safe",
        
    })
    return res.confirmation as boolean
}