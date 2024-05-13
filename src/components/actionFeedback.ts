import chalk, { ChalkInstance } from "chalk";

import { printMarginLeft } from "../utils/printMarginLeft.js";
import { printLineSpace } from "../utils/printLineSpace.js";

type Status = "success" | "error" | "warning" | "info";
export function actionFeedback(message: string, status: Status) {
  let color: Record<Status, string> = {
    success: "greenBright",
    error: "red",
    warning: "yellow",
    info: "blue",
  };
  printLineSpace();
  // @ts-ignore
  printMarginLeft(chalk.bold[color[status]](message));
  printLineSpace();
}
