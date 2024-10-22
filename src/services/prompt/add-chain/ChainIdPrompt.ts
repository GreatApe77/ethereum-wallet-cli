import inquirer from "inquirer";
import { Prompt } from "../Prompt.js";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { CancelOperationExcepetion } from "../../../exceptions/CancelOperationException.js";

export class ChainIdPrompt
	implements
		Prompt<{
			chainId: number;
		}>
{
	async question(
		validate?: (input: string) => boolean
	): Promise<{ chainId: number }> {
		try {
			const res = await inquirer.prompt({
				type: "input",
				name: "chainId",
                validate:(answer)=>{
                    if(validate){
                        return validate(answer)?true:"NAO PODE"

                    }
                    return "deu pau"
                }
				//validate:(input:string)=>{
				//    if(getUserOptionsState().chainExists(Number(input))){
				//        return "Chain Already Registered!"
				//    }
				//    if(Number(input)<1){
				//        return "Invalid Chain ID"
				//    }
				//    return true
				//},
				//message: "ChainId (ex: 4002):",
			});
			return {
				chainId: Number(res.chainId),
			};
		} catch (error) {
			if (error == InterruptedPrompt.EVENT_INTERRUPTED) {
                throw new CancelOperationExcepetion()
			}
            throw new Error()
		}
	}
}


new ChainIdPrompt().question((chainId)=>{
    return chainId !=="9999"
}).then((answer)=>{
    console.log(answer)
})