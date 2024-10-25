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
    needsMigration: true,
} as Partial<Settings>);

describe("SettingsFs - Test Suite", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset singleton instance between tests
        // @ts-ignore - accessing private static for testing
        SettingsFs.instance = undefined;
    });

    it("Should setup reading from a config file", () => {
        // Arrange
        const mock_existsSync_success = vi
            .mocked(fs.existsSync)
            .mockReturnValue(true);
        const mock_readFileSync_success = vi
            .mocked(fs.readFileSync)
            .mockReturnValue(dummyFileSuccess);

        // Act
        const settings = SettingsFs.getInstance();

        // Assert
        expect(mock_existsSync_success).toHaveBeenCalledWith(
            path.join(getRootDir(), "database", "settings.json")
        );
        expect(mock_readFileSync_success).toHaveBeenCalledWith(
            path.join(getRootDir(), "database", "settings.json"),
            "utf-8"
        );
    });

    it("Should not read from a config from setup and use standard configs", () => {
        // Arrange
        const mock_existsSync_fail = vi
            .mocked(fs.existsSync)
            .mockReturnValue(false);

        // Act
        const settings = SettingsFs.getInstance();

        // Assert
        expect(mock_existsSync_fail).toHaveBeenCalledWith(
            path.join(getRootDir(), "database", "settings.json")
        );
        expect(settings.settings.connectedAccountIndex).toBe(0);
    });

    it("Should read from a config file and update internal state", () => {
        // Arrange
        const mock_existsSync_success = vi
            .mocked(fs.existsSync)
            .mockReturnValue(true);
        const mock_readFileSync_success = vi
            .mocked(fs.readFileSync)
            .mockReturnValue(dummyFileSuccess);

        // Act
        const settings = SettingsFs.getInstance();
        settings.settings.connectedChainId = 9999;
        settings.read();

        // Assert
        expect(mock_existsSync_success).toHaveBeenCalledTimes(2);
        expect(mock_readFileSync_success).toHaveBeenCalled();
        expect(settings.settings).toEqual(JSON.parse(dummyFileSuccess));
    });

    it("Should save changed settings (directory exists)", () => {
        // Arrange
        const mock_writeFileSync = vi.mocked(fs.writeFileSync);
        const mock_existsSync_success = vi
            .mocked(fs.existsSync)
            .mockReturnValue(true);
        const settings = SettingsFs.getInstance();
        settings.settings.needsSeed = false;
        settings.settings.connectedAccountIndex = 19;

        // Act
        settings.save();

        // Assert
        expect(mock_existsSync_success).toHaveBeenCalled();
        expect(mock_writeFileSync).toHaveBeenCalledWith(
            path.join(getRootDir(), "database", "settings.json"),
            JSON.stringify(settings.settings, null, 2),
            { encoding: "utf-8" }
        );
    });

    it("Should save changed settings (create directory if not exists)", () => {
        // Arrange
        const mock_writeFileSync = vi.mocked(fs.writeFileSync);
        const mock_existsSync_fail = vi
            .mocked(fs.existsSync)
            .mockReturnValue(false);
        const settings = SettingsFs.getInstance();
        settings.settings.needsSeed = false;
        settings.settings.connectedAccountIndex = 19;
        const mock_mkdirSync = vi.mocked(fs.mkdirSync);

        // Act
        settings.save();

        // Assert
        expect(mock_existsSync_fail).toHaveBeenCalled();
        expect(mock_writeFileSync).toHaveBeenCalledWith(
            path.join(getRootDir(), "database", "settings.json"),
            JSON.stringify(settings.settings, null, 2),
            { encoding: "utf-8" }
        );
        expect(mock_mkdirSync).toHaveBeenCalledWith(
            path.join(getRootDir(), "database"),
            { recursive: true }
        );
    });
});