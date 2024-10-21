import { beforeEach, describe, expect, it, vi } from "vitest";
import { SettingsFs } from "./SettingsFs";
import fs from "node:fs";
import path from "node:path";
import { getRootDir } from "../../../shared/utils/get-root-dir";
import { Settings } from "../Settings";
vi.mock("node:fs");
const dummyFileSuccess = JSON.stringify({
	connectedAccountIndex: 0,
	connectedChainId: 1,
	needsSeed: true,
} as Partial<Settings>);
describe("SettingsFs - Test Suite", () => {
	const mock_readFileSync_fail = vi
		.mocked(fs.readFileSync)
		.mockImplementation((_path, _options) => {
			throw new Error();
		});

	beforeEach(() => {
		vi.clearAllMocks();
	});
	it("Should setup reading from a config file", () => {
		//ARRANGE
		const mock_existsSync_success = vi
			.mocked(fs.existsSync)
			.mockReturnValue(true);
		const mock_readFileSync_success = vi
			.mocked(fs.readFileSync)
			.mockReturnValue(dummyFileSuccess);

		//ACT
		const settings = new SettingsFs();

		//ASSERT

		expect(mock_existsSync_success).toHaveBeenCalledWith(
			path.join(getRootDir(), "database", "settings.json")
		);
		expect(mock_readFileSync_success).toHaveBeenCalledWith(
			path.join(getRootDir(), "database", "settings.json"),
			"utf-8"
		);
	});
	it("Should not read from a config from setup and use standard configs", () => {
		//ARRANGE
		const mock_existsSync_fail = vi
			.mocked(fs.existsSync)
			.mockReturnValue(false);
		//ACT
		const settings = new SettingsFs();
		//ASSERT
		expect(mock_existsSync_fail).toHaveBeenCalledWith(
			path.join(getRootDir(), "database", "settings.json")
		);
		expect(settings.settings.connectedAccountIndex).toBe(0);
	});
	it("Should read from a config file and update internal state", () => {
		const mock_existsSync_success = vi
			.mocked(fs.existsSync)
			.mockReturnValue(true);
		const mock_readFileSync_success = vi
			.mocked(fs.readFileSync)
			.mockReturnValue(dummyFileSuccess);

		//ACT
		const settings = new SettingsFs();
		settings.settings.connectedChainId = 9999;
		settings.read();
		//ASSERT
		expect(mock_existsSync_success).toHaveBeenCalledTimes(2);
		expect(mock_readFileSync_success).toHaveBeenCalled();
		expect(settings.settings).toEqual(JSON.parse(dummyFileSuccess));
	});
	it("Should save changed settings (directory exists)", () => {
		const mock_writeFileSync = vi.mocked(fs.writeFileSync);
        const mock_existsSync_success = vi
			.mocked(fs.existsSync)
			.mockReturnValue(true);
		const settings = new SettingsFs();
		settings.settings.needsSeed = false;
		settings.settings.connectedAccountIndex = 19;

		settings.save();

        expect(mock_existsSync_success).toHaveBeenCalled()
		expect(mock_writeFileSync).toHaveBeenCalledWith(
			path.join(getRootDir(), "database", "settings.json"),
			JSON.stringify(settings.settings, null, 2),
			{ encoding: "utf-8" }
		);
	});
    it("Should save changed settings (create directory if not exists)", () => {
		const mock_writeFileSync = vi.mocked(fs.writeFileSync);
        const mock_existsSync_fail = vi
			.mocked(fs.existsSync)
			.mockReturnValue(false);
		const settings = new SettingsFs();
		settings.settings.needsSeed = false;
		settings.settings.connectedAccountIndex = 19;
        const mock_mkdirSync = vi.mocked(fs.mkdirSync)
		settings.save();

        expect(mock_existsSync_fail).toHaveBeenCalled()
		expect(mock_writeFileSync).toHaveBeenCalledWith(
			path.join(getRootDir(), "database", "settings.json"),
			JSON.stringify(settings.settings, null, 2),
			{ encoding: "utf-8" }
		);
        expect(mock_mkdirSync).toHaveBeenCalledWith(path.join(getRootDir(), "database"),{recursive:true})
	});
});
