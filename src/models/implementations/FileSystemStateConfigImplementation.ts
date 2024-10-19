import { Settings, SettingsPersistence } from "../Settings.js";
import fs from "node:fs";
import path from "node:path";
import { getRootDir } from "../../shared/utils/get-root-dir.js";

export class SettingsFs implements SettingsPersistence {
	public settings: Settings = {
		connectedAccountIndex: 0,
		connectedChainId: 11155111,
        needsSeed:true
	};
    constructor(){
        this.read()
    }
	save(): void {
		const settingsPath = path.join(getRootDir(), "database", "settings.json");
		if (!fs.existsSync(settingsPath)) {
			fs.mkdirSync(path.join(getRootDir(),"database"))
		}
		fs.writeFileSync(settingsPath, JSON.stringify(this.settings,null,2), {
			encoding: "utf-8",
		});
	}
	read(): void {
		const settingsPath = path.join(getRootDir(), "database", "settings.json");
		if (!fs.existsSync(settingsPath)) {
			return;
		}
		this.settings = JSON.parse(
			fs.readFileSync(settingsPath, { encoding: "utf8" })
		);
	}
}
const set = new SettingsFs()
set.save()