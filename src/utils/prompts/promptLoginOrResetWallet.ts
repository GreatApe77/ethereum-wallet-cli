import inquirer from "inquirer"
export enum LoginOrResetWalletChoices{
    LOGIN,
    RESET_WALLET
}
export async function promptLoginOrResetWallet(){
    const res = await inquirer.prompt({
        type:"list",
        name:"name",
        message:"Select one of the following options:",
        choices:[
            {
                name:"Login",
                value:LoginOrResetWalletChoices.LOGIN
            },
            {
                name:"Reset Wallet",
                value:LoginOrResetWalletChoices.RESET_WALLET
            }
        ]
    })
    return res.name as LoginOrResetWalletChoices
}