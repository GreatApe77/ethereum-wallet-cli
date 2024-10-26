import { GenerateNewWalletController } from "./controllers/GenerateNewWalletController.js";
import { NetworkRepositorySqlite } from "./models/networks/repository/implementation/NeworkRepositorySqlite.js";
import { WalletRepositorySqlite } from "./models/wallet/repository/implementations/WalletRepositorySqlite.js";
import { CacheServiceNodeCache } from "./services/cache/implementation/CacheServiceNodeCache.js";
import { ClipboardServiceClipboardy } from "./services/clipboard/implementation/ClipboardServiceClipboardy.js";
import { AppNavigation } from "./services/navigation/implementations/AppNavigation.js";
import { Navigation } from "./services/navigation/Navigation.js";
import { ChainIdPrompt } from "./services/prompt/add-chain/ChainIdPrompt.js";
import { ChainNamePrompt } from "./services/prompt/add-chain/ChainNamePrompt.js";
import { ConfirmAddNetworkPrompt } from "./services/prompt/add-chain/ConfirmAddNetworkPrompt.js";
import { CurrencyTickerPrompt } from "./services/prompt/add-chain/CurrencyTickerPrompt.js";
import { RpcUrlPrompt } from "./services/prompt/add-chain/RpcUrlPrompt.js";
import { CreateOrImportPrompt } from "./services/prompt/create-or-import/CreateOrImportPrompt.js";
import { ConfirmationPrompt } from "./services/prompt/generate-wallet/ConfirmationPrompt.js";
import { CreatePasswordPrompt } from "./services/prompt/generate-wallet/CreatePasswordPrompt.js";
import { CreatePasswordForImportedWalletPrompt } from "./services/prompt/import-wallet/CreatePasswordForImportedWalletPrompt.js";
import { ImportedWalletMnemonicPrompt } from "./services/prompt/import-wallet/ImportedWalletMnemonicPrompt.js";
import { LoginOrResetPrompt } from "./services/prompt/login-or-reset/LoginOrResetPrompt.js";
import { WalletPasswordPrompt } from "./services/prompt/login/WalletPasswordPrompt.js";
import { MainMenuPrompt } from "./services/prompt/main-menu-options/MainMenuPrompt.js";
import { NetworksMenuPrompt } from "./services/prompt/networks-menu-options/NetworksMenuPrompt.js";
import { BackToMainMenuPrompt } from "./services/prompt/qr-code/BackToMainMenuPrompt.js";
import { ResetWalletConfirmationPrompt } from "./services/prompt/reset/ResetWalletConfirmationPrompt.js";
import { SwitchNetworkPrompt } from "./services/prompt/switch-network/SwitchNetworkPrompt.js";
import { SwitchAccountPrompt } from "./services/prompt/switchAccount/SwitchAccountPrompt.js";

export class AppContainer {
	private static instance: AppContainer;
	private services: Map<string, any> = new Map();

	private constructor() {}

	static getInstance(): AppContainer {
		if (!AppContainer.instance) {
			AppContainer.instance = new AppContainer();
		}
		return AppContainer.instance;
	}
	bootstrap() {
		// Registering all prompts
		this.registerService("ChainIdPrompt", new ChainIdPrompt());
		this.registerService("ChainNamePrompt", new ChainNamePrompt());
		this.registerService(
			"ConfirmAddNetworkPrompt",
			new ConfirmAddNetworkPrompt()
		);
		this.registerService("CurrencyTickerPrompt", new CurrencyTickerPrompt());
		this.registerService("RpcUrlPrompt", new RpcUrlPrompt());
		this.registerService("CreateOrImportPrompt", new CreateOrImportPrompt());
		this.registerService("ConfirmationPrompt", new ConfirmationPrompt());
		this.registerService("CreatePasswordPrompt", new CreatePasswordPrompt());
		this.registerService(
			"CreatePasswordForImportedWalletPrompt",
			new CreatePasswordForImportedWalletPrompt()
		);
		this.registerService(
			"ImportedWalletMnemonicPrompt",
			new ImportedWalletMnemonicPrompt()
		);
		this.registerService("LoginOrResetPrompt", new LoginOrResetPrompt());
		this.registerService("WalletPasswordPrompt", new WalletPasswordPrompt());
		this.registerService("MainMenuPrompt", new MainMenuPrompt());
		this.registerService("NetworksMenuPrompt", new NetworksMenuPrompt());
		this.registerService("BackToMainMenuPrompt", new BackToMainMenuPrompt());
		this.registerService(
			"ResetWalletConfirmationPrompt",
			new ResetWalletConfirmationPrompt()
		);
		this.registerService("SwitchNetworkPrompt", new SwitchNetworkPrompt());
		this.registerService("SwitchAccountPrompt", new SwitchAccountPrompt());
		

		//REPOSITORYS
		this.registerService("WalletRepository", new WalletRepositorySqlite());
		this.registerService("NetworkRepository", new NetworkRepositorySqlite());

    //SERVICES
		this.registerService("CacheService", new CacheServiceNodeCache());
    this.registerService("ClipboardService", new ClipboardServiceClipboardy());
    //this.registerService()
    
	}
	registerService(name: string, service: any) {
		this.services.set(name, service);
	}

	getService(name: string): any {
		return this.services.get(name);
	}
}
