import chalk from "chalk";
import { MarginLeft } from "./MarginLeft.js";
import { LineBreak } from "./LineBreak.js";

export class CancelOperationInformation {
    static render(){
        LineBreak.render()
        MarginLeft.render(chalk.bgYellow.bold("Press ESC to cancel the operation"))
        LineBreak.render()
    }
}