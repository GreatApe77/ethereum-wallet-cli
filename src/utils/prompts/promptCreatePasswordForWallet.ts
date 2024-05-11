import inquirer from "inquirer";

export async function promptCreatePasswordForWallet(){
    const res = await inquirer.prompt({
        type:"password",
        name:"password",
        message:"Please create a secure password for your Wallet \n (REMEMBER: This password is only valid in this computer for extra security,\n the MNEMONIC PHRASE is the only way to recover your wallet in another device)",
        
    })
    return res.password as string
}