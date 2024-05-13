import inquirer from "inquirer";

export enum MainMenuOptions{
    OPTION_1,
    OPTION_2,
    OPTION_3
}
export async function promptMainMenuOptions(){
    const res = await inquirer.prompt({
        type:"list",
        name:"choice",
        message:"Select one of the following options:",
        choices:[
            {
                name:"OPTION 1",
                value:MainMenuOptions.OPTION_1
            },
            {
                name:"OPTION 2",
                value:MainMenuOptions.OPTION_2
            },
            {
                name:"OPTION 3",
                value:MainMenuOptions.OPTION_3
            }
        ]
    })
    return res.choice as MainMenuOptions
}