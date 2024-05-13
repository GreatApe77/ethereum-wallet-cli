import chalk from "chalk";


type MenuProps = {
  connectedChain: string;
  currentAddress: string;
  balance: string;
  nativeCurrency: string;
};
export function printWalletMainMenu(props: MenuProps) {
  //console.log(chalk.bold("===== Wallet Main Menu ====="))
  //printLineSpace()
  //console.log(`Connected Chain: ${props.connectedChain}`)
  //console.log(`Current Address: ${props.currentAddress}`)
  //console.log(`Balance: ${props.balance} ${chalk.bold(props.nativeCurrency)}`)
  const mainMenuTemplate = `
${chalk.bold("===========================")}
    ${chalk.bold("Wallet Main Menu")}
${chalk.bold("===========================")}

Connected Chain: ${props.connectedChain}
Current Address: ${props.currentAddress}
Balance: ${props.balance} ${chalk.bold(props.nativeCurrency)}
`;
console.log(mainMenuTemplate)
}
