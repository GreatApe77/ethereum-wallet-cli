import inquirer from "inquirer";

export async function promptCreatePasswordForWallet(){
    const res = await inquirer.prompt({
        type:"password",
        name:"password",
        message:"Please create a secure password for your Wallet:",
        
    })
    return res.password as string
}