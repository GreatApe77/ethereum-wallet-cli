import chalk from "chalk";
import { MarginLeft } from "./MarginLeft.js";
import { LineBreak } from "./LineBreak.js";

export class ExplainMnemoincPhrase{
    static render(){
        MarginLeft.render(chalk.bold(
            "Your wallet's security is primarily dependent on a unique phrase called a mnemonic (or seed) phrase.\n This sequence of words acts as a master key, granting access to your wallet and all its associated funds."
        ))
        LineBreak.render()
    }
}