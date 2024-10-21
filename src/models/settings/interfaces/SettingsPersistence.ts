import { Settings } from "../Settings.js";

export interface SettingsPersistence {
	save(): void;
	read(): void;
	settings: Settings;
}
