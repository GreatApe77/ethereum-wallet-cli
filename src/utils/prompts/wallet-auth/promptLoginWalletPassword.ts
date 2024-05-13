import inquirer from "inquirer";

export async function promptLoginWalletPassword(){
    const res = await inquirer.prompt({
        type:"password",
        name:"password",
        message:"Please enter your wallet password:",
        
    })
    return res.password as string
}