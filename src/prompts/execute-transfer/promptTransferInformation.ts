import { ethers } from "ethers";
import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";

export async function promptTransferInformation(tokenSymbol: string,balance:bigint) {
  try {
    const res = await inquirer.prompt([
      {
        type: "input",
        name: "to",
        message: "Enter the address you want to send the tokens:",
        validate: (value: string) => {
          if (!ethers.isAddress(value)) {
            return "Invalid address";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "amount",
        message: `Enter the amount of ${tokenSymbol} you want to send:`,
        validate: (value: string) => {
            if(isNaN(Number(value))) return "Invalid Value!"
            if(ethers.parseEther(value)>balance) return "Insufficient Balance!"
            return true
          
        },
      },
    ]);

    return res as { to: string; amount: string }
  } catch (error) {
    if (error == InterruptedPrompt.EVENT_INTERRUPTED) {
      return -1;
    }
  }
}
