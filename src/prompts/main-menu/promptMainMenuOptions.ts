import inquirer from "inquirer";

export enum MainMenuOptions {
  SWITCH_ACCOUNT,
  SWITCH_CHAIN,
  ADD_CHAIN,
  SEND_TRANSACTION,
  NAVIGATE_TO_ERC20TOKENS_MENU
}
export async function promptMainMenuOptions() {
  const res = await inquirer.prompt({
    type: "list",
    name: "choice",
    message: "Select one of the following options:",
    choices: [
      {
        name: "Switch Account",
        value: MainMenuOptions.SWITCH_ACCOUNT,
      },
      {
        name: "Switch Chain",
        value: MainMenuOptions.SWITCH_CHAIN,
      },
      {
        name: "Add Custom Network",
        value: MainMenuOptions.ADD_CHAIN,
      },
      {
        name:"Send Transaction",
        value:MainMenuOptions.SEND_TRANSACTION
      },
      {
        name:"Tokens",
        value:MainMenuOptions.NAVIGATE_TO_ERC20TOKENS_MENU
      }
    ],
  });
  return res.choice as MainMenuOptions;
}
