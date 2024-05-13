import chalk from "chalk";
import { printAsciiArt } from "../utils/printTitle.js";
import { printLineSpace } from "../utils/printLineSpace.js";

export async function printMainTitle() {
  await printAsciiArt("TermiWallet!");
  console.log(
    chalk.italic.bold(" Your Ethereum personal wallet in the terminal!")
  );
  printLineSpace();
}
