import chalk from "chalk";
import { LineBreak } from "./LineBreak.js";
import { MarginLeft } from "./MarginLeft.js";

type Status = "success" | "error" | "warning" | "info";
export class ActionFeedback {
	static render(message: string, status: Status) {
		let color: Record<Status, string> = {
			success: "greenBright",
			error: "red",
			warning: "yellow",
			info: "blue",
		};

		LineBreak.render();
		//@ts-ignore
		MarginLeft.render(chalk.bold[color[status]](message));
		LineBreak.render();
	}
}

