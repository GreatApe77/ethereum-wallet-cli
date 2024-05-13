import inquirer from "inquirer";

export async function promptRequestMnemonic(){
    const res = await inquirer.prompt({
        type:"input",
        name:"mnemonic",
        message:"Your 12 word mnemonic phrase:",
        validate: (input: string) => {
            if(input.split(" ").length !== 12){
                return "Mnemonic phrase must be 12 words long!"
            }
            return true
        }
        
    })
    return res.mnemonic as string
}