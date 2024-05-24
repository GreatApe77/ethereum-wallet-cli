import inquirer from "inquirer";

export enum MainMenuOptions{
    SWITCH_ACCOUNT,
    SWITCH_CHAIN,
    OPTION_3
}
export async function promptMainMenuOptions(){
    const res = await inquirer.prompt({
        type:"list",
        name:"choice",
        message:"Select one of the following options:",
        choices:[
            {
                name:"Switch Account",
                value:MainMenuOptions.SWITCH_ACCOUNT
            },
            {
                name:"Switch Chain",
                value:MainMenuOptions.SWITCH_CHAIN
            },
            {
                name:"OPTION 3",
                value:MainMenuOptions.OPTION_3
            }
        ]
    })
    return res.choice as MainMenuOptions
}