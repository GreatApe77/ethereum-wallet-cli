import { getRootDir } from "../../shared/utils/get-root-dir.js";
import { SettingsRepository } from "../../domain/repositories/SettingsRepository.js";
import { Settings } from "../../domain/entities/Settings.js";
import path from "node:path";
import fs from "node:fs";

export class SettingsFs implements SettingsRepository {
	public settings: Settings = {
		connectedAccountIndex: 0,
		connectedChainId: 11155111, //SEPOLIA,
		needsSeed: true,
		needsMigration: true,
	};
	constructor() {
		this.read();
	}
	save(): void {
		const settingsPath = path.join(getRootDir(), "database", "settings.json");
		if (!fs.existsSync(settingsPath)) {
			fs.mkdirSync(path.join(getRootDir(), "database"), { recursive: true });
		}
		fs.writeFileSync(settingsPath, JSON.stringify(this.settings, null, 2), {
			encoding: "utf-8",
		});
	}

	read(): void {
		const settingsPath = path.join(getRootDir(), "database", "settings.json");
		if (fs.existsSync(settingsPath)) {
			this.settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
		}
	}
}
