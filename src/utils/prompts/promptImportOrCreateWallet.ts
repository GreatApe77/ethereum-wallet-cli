import inquirer from "inquirer";
export enum ImportOrCreateChoices{
    CREATE_NEW_WALLET,
    IMPORT
}
export async function promptImportOrCreate(){
    const res = await inquirer.prompt({
        type:"list",
        name:"name",
        message:"To get started, Choose one option below:",
        choices:[
            {
                name:"Create a new wallet",
                value:ImportOrCreateChoices.CREATE_NEW_WALLET
            },
            {
                name:"Import an existing wallet",
                value:ImportOrCreateChoices.IMPORT
            }
        ]
    })
    return res.name as ImportOrCreateChoices
}

