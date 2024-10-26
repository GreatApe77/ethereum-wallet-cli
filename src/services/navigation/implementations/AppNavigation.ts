import { AppContainer } from "../../../AppContainer.js";
import { AddChainController } from "../../../controllers/AddChainController.js";
import { AuthController } from "../../../controllers/AuthController.js";
import { Controller } from "../../../controllers/Controller.js";
import { CopyToClipBoardController } from "../../../controllers/CopyToClipboardController.js";
import { GenerateNewWalletController } from "../../../controllers/GenerateNewWalletController.js";
import { GenerateQrCodeController } from "../../../controllers/GenerateQrCodeController.js";
import { ImportWalletController } from "../../../controllers/ImportWalletController.js";
import { LoginController } from "../../../controllers/LoginController.js";
import { LogoutController } from "../../../controllers/LogoutController.js";
import { MainMenuController } from "../../../controllers/MainMenuController.js";
import { NetworksMenuController } from "../../../controllers/NetworksMenuController.js";
import { ResetWalletController } from "../../../controllers/ResetWalletController.js";
import { SendTransactionController } from "../../../controllers/SendTransactionController.js";
import { SwitchAccountController } from "../../../controllers/SwitchAccountController.js";
import { SwitchNetworkController } from "../../../controllers/SwitchNetworkController.js";
import { NetworkRepositorySqlite } from "../../../models/networks/repository/implementation/NeworkRepositorySqlite.js";
import { WalletRepositorySqlite } from "../../../models/wallet/repository/implementations/WalletRepositorySqlite.js";
import { Screens } from "../../../shared/types/Screens.js";
import { ClipboardServiceClipboardy } from "../../clipboard/implementation/ClipboardServiceClipboardy.js";
import { ChainIdPrompt } from "../../prompt/add-chain/ChainIdPrompt.js";
import { ChainNamePrompt } from "../../prompt/add-chain/ChainNamePrompt.js";
import { ConfirmAddNetworkPrompt } from "../../prompt/add-chain/ConfirmAddNetworkPrompt.js";
import { CurrencyTickerPrompt } from "../../prompt/add-chain/CurrencyTickerPrompt.js";
import { RpcUrlPrompt } from "../../prompt/add-chain/RpcUrlPrompt.js";
import { CreateOrImportPrompt } from "../../prompt/create-or-import/CreateOrImportPrompt.js";
import { ConfirmationPrompt } from "../../prompt/generate-wallet/ConfirmationPrompt.js";
import { CreatePasswordPrompt } from "../../prompt/generate-wallet/CreatePasswordPrompt.js";
import { CreatePasswordForImportedWalletPrompt } from "../../prompt/import-wallet/CreatePasswordForImportedWalletPrompt.js";
import { ImportedWalletMnemonicPrompt } from "../../prompt/import-wallet/ImportedWalletMnemonicPrompt.js";
import { LoginOrResetPrompt } from "../../prompt/login-or-reset/LoginOrResetPrompt.js";
import { WalletPasswordPrompt } from "../../prompt/login/WalletPasswordPrompt.js";
import { MainMenuPrompt } from "../../prompt/main-menu-options/MainMenuPrompt.js";
import { NetworksMenuPrompt } from "../../prompt/networks-menu-options/NetworksMenuPrompt.js";
import { BackToMainMenuPrompt } from "../../prompt/qr-code/BackToMainMenuPrompt.js";
import { ResetWalletConfirmationPrompt } from "../../prompt/reset/ResetWalletConfirmationPrompt.js";
import { SwitchNetworkPrompt } from "../../prompt/switch-network/SwitchNetworkPrompt.js";
import { SwitchAccountPrompt } from "../../prompt/switchAccount/SwitchAccountPrompt.js";
import { Navigation } from "../Navigation.js";

export class AppNavigation implements Navigation {
	private appContainer: AppContainer = AppContainer.getInstance()
	private controllers: Record<Screens, Controller> | undefined;
	// controllers: Record<Screens, Controller> = {
	// 	"generate-wallet": new GenerateNewWalletController(
	// 		new ConfirmationPrompt(),
	// 		new CreatePasswordPrompt(),
	// 		new WalletRepositorySqlite(),
	// 		this
	// 	),
	// 	auth: new AuthController(
	// 		new CreateOrImportPrompt(),
	// 		new LoginOrResetPrompt(),
	// 		this,
	// 		new WalletRepositorySqlite()
	// 	),
	// 	login: new LoginController(
	// 		new WalletRepositorySqlite(),
	// 		this,
	// 		new WalletPasswordPrompt()
	// 	),
	// 	reset: new ResetWalletController(
	// 		new ResetWalletConfirmationPrompt(),
	// 		new WalletRepositorySqlite(),
	// 		this
	// 	),
	// 	"import-wallet": new ImportWalletController(
	// 		new ImportedWalletMnemonicPrompt(),
	// 		new WalletRepositorySqlite(),
	// 		new CreatePasswordForImportedWalletPrompt(),
	// 		this
	// 	),
	// 	"main-menu": new MainMenuController(
	// 		new NetworkRepositorySqlite(),
	// 		this,
	// 		new MainMenuPrompt()
	// 	),
	// 	"copy-to-clipboard": new CopyToClipBoardController(
	// 		new ClipboardServiceClipboardy(),
	// 		this
	// 	),
	// 	"switch-account": new SwitchAccountController(
	// 		new SwitchAccountPrompt(),
	// 		this
	// 	),
	// 	logout: new LogoutController(this),
	// 	"qr-code": new GenerateQrCodeController(new BackToMainMenuPrompt(), this),
	// 	"networks-menu": new NetworksMenuController(
	// 		new NetworkRepositorySqlite(),
	// 		new NetworksMenuPrompt(),
	// 		this
	// 	),
	// 	"switch-network": new SwitchNetworkController(
	// 		new NetworkRepositorySqlite(),
	// 		new SwitchNetworkPrompt(),
	// 		this
	// 	),
	// 	"add-network": new AddChainController(
	// 		new ChainIdPrompt(),
	// 		new ChainNamePrompt(),
	// 		new CurrencyTickerPrompt(),
	// 		new RpcUrlPrompt(),
	// 		new ConfirmAddNetworkPrompt(),
	// 		new NetworkRepositorySqlite(),
	// 		this,
			
	// 	)
	// };
	public bootstrapControllers():void{
		this.controllers = {
			"generate-wallet": new GenerateNewWalletController(
				this.appContainer.getService("ConfirmationPrompt"),
				this.appContainer.getService("CreatePasswordPrompt"),
				this.appContainer.getService("WalletRepository"),
				this
			),
			auth: new AuthController(
				this.appContainer.getService("CreateOrImportPrompt"),
				this.appContainer.getService("LoginOrResetPrompt"),
				this,
				this.appContainer.getService("WalletRepository")
			),
			login: new LoginController(
				this.appContainer.getService("WalletRepository"),
				this,
				this.appContainer.getService("WalletPasswordPrompt")
			),
			reset: new ResetWalletController(
				this.appContainer.getService("ResetWalletConfirmationPrompt"),
				this.appContainer.getService("WalletRepository"),
				this
			),
			"import-wallet": new ImportWalletController(
				this.appContainer.getService("ImportedWalletMnemonicPrompt"),
				this.appContainer.getService("WalletRepository"),
				this.appContainer.getService("CreatePasswordForImportedWalletPrompt"),
				this
			),
			"main-menu": new MainMenuController(
				this.appContainer.getService("NetworkRepository"),
				this,
				this.appContainer.getService("MainMenuPrompt"),
				this.appContainer.getService("CacheService")
			),
			"copy-to-clipboard": new CopyToClipBoardController(
				this.appContainer.getService("ClipboardService"),
				this
			),
			"switch-account": new SwitchAccountController(
				this.appContainer.getService("SwitchAccountPrompt"),
				this
			),
			logout: new LogoutController(this),
			"qr-code": new GenerateQrCodeController(
				this.appContainer.getService("BackToMainMenuPrompt"),
				this	
			),
			"networks-menu": new NetworksMenuController(
				this.appContainer.getService("NetworkRepository"),
				this.appContainer.getService("NetworksMenuPrompt"),
				this
			),
			"switch-network": new SwitchNetworkController(
				this.appContainer.getService("NetworkRepository"),
				this.appContainer.getService("SwitchNetworkPrompt"),
				this
			),
			"add-network": new AddChainController(
				this.appContainer.getService("ChainIdPrompt"),
				this.appContainer.getService("ChainNamePrompt"),
				this.appContainer.getService("CurrencyTickerPrompt"),
				this.appContainer.getService("RpcUrlPrompt"),
				this.appContainer.getService("ConfirmAddNetworkPrompt"),
				this.appContainer.getService("NetworkRepository"),
				this,
				
			),
			"send-transaction":new SendTransactionController(
				this.appContainer.getService("TargetAddressPrompt"),
				this.appContainer.getService("TargetValuePrompt"),
				this.appContainer.getService("ConfirmTransactionPrompt"),
				this.appContainer.getService("CacheService"),
				this.appContainer.getService("NetworkRepository"),
	
				this
			)
			
		};
	}
	private getController(screen: Screens): Controller {
		return this.controllers![screen];
	}
	async navigateTo(screen: Screens): Promise<void> {
		await this.getController(screen).handle();
	}
}
