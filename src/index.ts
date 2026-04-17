import inquirer from "inquirer";
import InterruptedPrompt from "inquirer-interrupted-prompt";
import { locator } from "./core/di/diContainer.js";

// Core Infra
import { DatabaseSqlite } from "./infra/database/DatabaseSqlite.js";
import { SettingsFs } from "./infra/repositories/SettingsFs.js";
import { AppNavigation } from "./infra/services/AppNavigation.js";
import { CacheServiceNodeCache } from "./infra/services/CacheServiceNodeCache.js";
import { ClipboardServiceClipboardy } from "./infra/services/ClipboardServiceClipboardy.js";
import { EthersWallet } from "./infra/services/EthersWallet.js";
import { NetworkRepositorySqlite } from "./infra/repositories/NetworkRepositorySqlite.js";
import { WalletRepositorySqlite } from "./infra/repositories/WalletRepositorySqlite.js";

// Domain Abstractions
import { SettingsRepository } from "./domain/repositories/SettingsRepository.js";
import { NetworkRepository } from "./domain/repositories/NetworkRepository.js";
import { WalletRepository } from "./domain/repositories/WalletRepository.js";
import { WalletService } from "./domain/services/WalletService.js";
import { CacheService } from "./domain/services/CacheService.js";
import { ClipboardService } from "./domain/services/ClipboardService.js";
import { Navigation } from "./domain/services/Navigation.js";

// Prompts
import { ChainIdPrompt } from "./presentation/prompts/add-chain/ChainIdPrompt.js";
import { ChainNamePrompt } from "./presentation/prompts/add-chain/ChainNamePrompt.js";
import { ConfirmAddNetworkPrompt } from "./presentation/prompts/add-chain/ConfirmAddNetworkPrompt.js";
import { CurrencyTickerPrompt } from "./presentation/prompts/add-chain/CurrencyTickerPrompt.js";
import { RpcUrlPrompt } from "./presentation/prompts/add-chain/RpcUrlPrompt.js";
import { CreateOrImportPrompt } from "./presentation/prompts/create-or-import/CreateOrImportPrompt.js";
import { ConfirmationPrompt } from "./presentation/prompts/generate-wallet/ConfirmationPrompt.js";
import { CreatePasswordPrompt } from "./presentation/prompts/generate-wallet/CreatePasswordPrompt.js";
import { CreatePasswordForImportedWalletPrompt } from "./presentation/prompts/import-wallet/CreatePasswordForImportedWalletPrompt.js";
import { ImportedWalletMnemonicPrompt } from "./presentation/prompts/import-wallet/ImportedWalletMnemonicPrompt.js";
import { LoginOrResetPrompt } from "./presentation/prompts/login-or-reset/LoginOrResetPrompt.js";
import { WalletPasswordPrompt } from "./presentation/prompts/login/WalletPasswordPrompt.js";
import { MainMenuPrompt } from "./presentation/prompts/main-menu-options/MainMenuPrompt.js";
import { NetworksMenuPrompt } from "./presentation/prompts/networks-menu-options/NetworksMenuPrompt.js";
import { BackToMainMenuPrompt } from "./presentation/prompts/qr-code/BackToMainMenuPrompt.js";
import { ResetWalletConfirmationPrompt } from "./presentation/prompts/reset/ResetWalletConfirmationPrompt.js";
import { SwitchNetworkPrompt } from "./presentation/prompts/switch-network/SwitchNetworkPrompt.js";
import { SwitchAccountPrompt } from "./presentation/prompts/switchAccount/SwitchAccountPrompt.js";
import { TargetAddressPrompt } from "./presentation/prompts/send-transaction/TargetAddressPrompt.js";
import { TargetValuePrompt } from "./presentation/prompts/send-transaction/TargetValuePrompt.js";
import { ConfirmTransactionPrompt } from "./presentation/prompts/send-transaction/ConfirmTransactionPrompt.js";

// Presenters
import { AddChainPresenter } from "./presentation/presenters/AddChainPresenter.js";
import { AuthPresenter } from "./presentation/presenters/AuthPresenter.js";
import { CopyToClipboardPresenter } from "./presentation/presenters/CopyToClipboardPresenter.js";
import { GenerateNewWalletPresenter } from "./presentation/presenters/GenerateNewWalletPresenter.js";
import { GenerateQrCodePresenter } from "./presentation/presenters/GenerateQrCodePresenter.js";
import { ImportWalletPresenter } from "./presentation/presenters/ImportWalletPresenter.js";
import { LoginPresenter } from "./presentation/presenters/LoginPresenter.js";
import { LogoutPresenter } from "./presentation/presenters/LogoutPresenter.js";
import { MainMenuPresenter } from "./presentation/presenters/MainMenuPresenter.js";
import { NetworksMenuPresenter } from "./presentation/presenters/NetworksMenuPresenter.js";
import { ResetWalletPresenter } from "./presentation/presenters/ResetWalletPresenter.js";
import { SendTransactionPresenter } from "./presentation/presenters/SendTransactionPresenter.js";
import { SwitchAccountPresenter } from "./presentation/presenters/SwitchAccountPresenter.js";
import { SwitchNetworkPresenter } from "./presentation/presenters/SwitchNetworkPresenter.js";


InterruptedPrompt.fromAll(inquirer);

async function main() {
	// Register DB & Repositories
	const db = new DatabaseSqlite();
	locator.registerSingleton(DatabaseSqlite, db);
	locator.registerSingleton(SettingsRepository, new SettingsFs());
	locator.registerSingleton(NetworkRepository, new NetworkRepositorySqlite(db));
	locator.registerSingleton(WalletRepository, new WalletRepositorySqlite(db));

	// Register Services
	locator.registerSingleton(WalletService, new EthersWallet(locator.get(SettingsRepository)));
	locator.registerSingleton(CacheService, new CacheServiceNodeCache());
	locator.registerSingleton(ClipboardService, new ClipboardServiceClipboardy());
	
	const navigation = new AppNavigation();
	locator.registerSingleton(Navigation, navigation);

	// Register Prompts
	locator.registerFactory(ChainIdPrompt, () => new ChainIdPrompt());
	locator.registerFactory(ChainNamePrompt, () => new ChainNamePrompt());
	locator.registerFactory(ConfirmAddNetworkPrompt, () => new ConfirmAddNetworkPrompt());
	locator.registerFactory(CurrencyTickerPrompt, () => new CurrencyTickerPrompt());
	locator.registerFactory(RpcUrlPrompt, () => new RpcUrlPrompt());
	locator.registerFactory(CreateOrImportPrompt, () => new CreateOrImportPrompt());
	locator.registerFactory(ConfirmationPrompt, () => new ConfirmationPrompt());
	locator.registerFactory(CreatePasswordPrompt, () => new CreatePasswordPrompt());
	locator.registerFactory(CreatePasswordForImportedWalletPrompt, () => new CreatePasswordForImportedWalletPrompt());
	locator.registerFactory(ImportedWalletMnemonicPrompt, () => new ImportedWalletMnemonicPrompt());
	locator.registerFactory(LoginOrResetPrompt, () => new LoginOrResetPrompt());
	locator.registerFactory(WalletPasswordPrompt, () => new WalletPasswordPrompt());
	locator.registerFactory(MainMenuPrompt, () => new MainMenuPrompt());
	locator.registerFactory(NetworksMenuPrompt, () => new NetworksMenuPrompt());
	locator.registerFactory(BackToMainMenuPrompt, () => new BackToMainMenuPrompt());
	locator.registerFactory(ResetWalletConfirmationPrompt, () => new ResetWalletConfirmationPrompt());
	locator.registerFactory(SwitchNetworkPrompt, () => new SwitchNetworkPrompt());
	locator.registerFactory(SwitchAccountPrompt, () => new SwitchAccountPrompt(locator.get(WalletService)));
	locator.registerFactory(TargetAddressPrompt, () => new TargetAddressPrompt());
	locator.registerFactory(TargetValuePrompt, () => new TargetValuePrompt());
	locator.registerFactory(ConfirmTransactionPrompt, () => new ConfirmTransactionPrompt());

	// Register Presenters
	locator.registerFactory(AddChainPresenter, () => new AddChainPresenter(
		locator.get(ChainIdPrompt),
		locator.get(ChainNamePrompt),
		locator.get(CurrencyTickerPrompt),
		locator.get(RpcUrlPrompt),
		locator.get(ConfirmAddNetworkPrompt),
		locator.get(NetworkRepository),
		locator.get(Navigation)
	));
	locator.registerFactory(AuthPresenter, () => new AuthPresenter(
		locator.get(CreateOrImportPrompt),
		locator.get(LoginOrResetPrompt),
		locator.get(Navigation),
		locator.get(WalletRepository)
	));
	locator.registerFactory(CopyToClipboardPresenter, () => new CopyToClipboardPresenter(
		locator.get(WalletService),
		locator.get(SettingsRepository),
		locator.get(ClipboardService),
		locator.get(Navigation)
	));
	locator.registerFactory(GenerateNewWalletPresenter, () => new GenerateNewWalletPresenter(
		locator.get(WalletService),
		locator.get(ConfirmationPrompt),
		locator.get(CreatePasswordPrompt),
		locator.get(WalletRepository),
		locator.get(Navigation)
	));
	locator.registerFactory(GenerateQrCodePresenter, () => new GenerateQrCodePresenter(
		locator.get(WalletService),
		locator.get(SettingsRepository),
		locator.get(BackToMainMenuPrompt),
		locator.get(Navigation)
	));
	locator.registerFactory(ImportWalletPresenter, () => new ImportWalletPresenter(
		locator.get(WalletService),
		locator.get(ImportedWalletMnemonicPrompt),
		locator.get(WalletRepository),
		locator.get(CreatePasswordForImportedWalletPrompt),
		locator.get(Navigation)
	));
	locator.registerFactory(LoginPresenter, () => new LoginPresenter(
		locator.get(WalletService),
		locator.get(WalletRepository),
		locator.get(Navigation),
		locator.get(WalletPasswordPrompt)
	));
	locator.registerFactory(LogoutPresenter, () => new LogoutPresenter(
		locator.get(WalletService),
		locator.get(Navigation)
	));
	locator.registerFactory(MainMenuPresenter, () => new MainMenuPresenter(
		locator.get(WalletService),
		locator.get(SettingsRepository),
		locator.get(NetworkRepository),
		locator.get(Navigation),
		locator.get(MainMenuPrompt),
		locator.get(CacheService)
	));
	locator.registerFactory(NetworksMenuPresenter, () => new NetworksMenuPresenter(
		locator.get(SettingsRepository),
		locator.get(NetworkRepository),
		locator.get(NetworksMenuPrompt),
		locator.get(Navigation)
	));
	locator.registerFactory(ResetWalletPresenter, () => new ResetWalletPresenter(
		locator.get(WalletService),
		locator.get(ResetWalletConfirmationPrompt),
		locator.get(WalletRepository),
		locator.get(Navigation)
	));
	locator.registerFactory(SendTransactionPresenter, () => new SendTransactionPresenter(
		locator.get(WalletService),
		locator.get(SettingsRepository),
		locator.get(TargetAddressPrompt),
		locator.get(TargetValuePrompt),
		locator.get(ConfirmTransactionPrompt),
		locator.get(CacheService),
		locator.get(NetworkRepository),
		locator.get(Navigation)
	));
	locator.registerFactory(SwitchAccountPresenter, () => new SwitchAccountPresenter(
		locator.get(WalletService),
		locator.get(SettingsRepository),
		locator.get(SwitchAccountPrompt),
		locator.get(Navigation)
	));
	locator.registerFactory(SwitchNetworkPresenter, () => new SwitchNetworkPresenter(
		locator.get(SettingsRepository),
		locator.get(NetworkRepository),
		locator.get(SwitchNetworkPrompt),
		locator.get(Navigation)
	));

	const settings = locator.get(SettingsRepository);

	if (settings.settings.needsMigration) {
		await db.migrate();
		settings.settings.needsMigration = false;
		settings.save();
	}
	if (settings.settings.needsSeed) {
		await db.seed();
		settings.settings.needsSeed = false;
		settings.save();
	}

	navigation.bootstrapControllers();
	await navigation.navigateTo("auth");
}

main().catch(console.error);