import inquirer from "inquirer";

export async function promptResetWalletConfirmation(){
    const res = await inquirer.prompt({
        type:"confirm",
        default:false,
        name:"confirmation",
        message:"Are you sure you want to reset your wallet? This will delete all your data and you will have to create a new wallet",
    })
    return res.confirmation as boolean
}