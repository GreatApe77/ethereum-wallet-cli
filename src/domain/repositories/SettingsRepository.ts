import { Settings } from "../entities/Settings.js";

export abstract class SettingsRepository {
	abstract save(): void;
	abstract read(): void;
	abstract settings: Settings;
}
