import chalk from "chalk";
import { MarginLeft } from "./MarginLeft.js";

type Status = "success" | "error" | "warning" | "info";

export class Alert {
	static render(message: string, status: Status) {
		let color: Record<Status, string> = {
			success: "bgGreenBright",
			error: "bgRed",
			warning: "bgYellow",
			info: "bgBlue",
		};
        // @ts-ignore
		MarginLeft.render(chalk[color[status]](message));
	}
}
