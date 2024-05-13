

import { walletAuthRoutine } from "./routines/walletAuthRoutine.js";
import { mainMenuRoutine } from "./routines/mainMenuRoutine.js";
import { printMainTitle } from "./printing/printMainTitle.js";


async function main() {
  await printMainTitle()
  await walletAuthRoutine();
  await mainMenuRoutine();
  //console.log(JSON.parse(jsonWallet));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
