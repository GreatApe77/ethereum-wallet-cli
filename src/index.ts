import { printAsciiArt } from "./utils/printing/printTitle.js";
import chalk from "chalk";

import { walletAuthRoutine } from "./routines/walletAuthRoutine.js";


async function main() {
  await printAsciiArt("TermiWallet!");
  console.log(chalk.italic.bold("Your favorite Ethereum CLI!"));
  await walletAuthRoutine();
 //await mainMenuRoutine();
  //console.log(JSON.parse(jsonWallet));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
