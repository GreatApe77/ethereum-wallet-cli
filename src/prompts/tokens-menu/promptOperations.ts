import inquirer from "inquirer"

export enum TokenMenuOperations {
    BACK_TO_MAIN_MENU,
    IMPORT_TOKEN,
    DELETE_TOKEN,
    TRANSFER_TOKEN,
}


export async function promptOperations(){
    const res = await inquirer.prompt({
        type:"list",
        name:"operation",
        message:"Choose an operation:",
        choices:[
            {name:"Back to Main Menu",value:TokenMenuOperations.BACK_TO_MAIN_MENU},
            {name:"Import Token",value:TokenMenuOperations.IMPORT_TOKEN},
            {name:"Delete Token",value:TokenMenuOperations.DELETE_TOKEN},
            {name:"Transfer Token",value:TokenMenuOperations.TRANSFER_TOKEN}
        ]
    })
    return res.operation as TokenMenuOperations
}