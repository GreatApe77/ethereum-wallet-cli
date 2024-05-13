import chalk, { ChalkInstance } from "chalk";
import { printLineSpace } from "../utils/printing/printLineSpace.js";
import { printMarginLeft } from "../utils/printMarginLeft.js";

type Status = "success" | "error" | "warning" | "info";
export function actionFeedback(message: string, status: Status) {
    let color:Record<Status, string> = {
        success: "greenBright",
        error: "red",
        warning: "yellow",
        info: "blue"
    }
    printLineSpace()
    // @ts-ignore
    printMarginLeft(chalk.bold[color[status]](message))
    printLineSpace()
}
