import chalk from "chalk";
import { printAsciiArt } from "./printTitle.js";
import { printLineSpace } from "./printLineSpace.js";

export async function printMainTitle() {
  await printAsciiArt("TermiWallet!");
  console.log(chalk.italic.bold(" Your Ethereum personal wallet in the terminal!"));
  printLineSpace();
}
