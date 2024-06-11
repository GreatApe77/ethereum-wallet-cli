import inquirer from "inquirer";

export async function promptTokenImportConfirmation() {
  const answer = await inquirer.prompt({
    type: "confirm",
    name: "confirmation",
    message: "Do you want to import this token?",
  });
    return answer.confirmation as boolean;
}
