import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";


export async function promptConfirmation() {
  try {
    const res = await inquirer.prompt({
      type: "confirm",
      name: "confirmation",
      message: "Are you sure you want to proceed?",
    });
    return res.confirmation as boolean;
  } catch (error) {
    if (error == InterruptedPrompt.EVENT_INTERRUPTED) {
      return -1;
    }
    throw new Error("Error prompt Confirmation");
  }
}