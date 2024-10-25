import { AuthController } from "../../../controllers/AuthController.js";
import { Controller } from "../../../controllers/Controller.js";
import { CopyToClipBoardController } from "../../../controllers/CopyToClipboardController.js";
import { GenerateNewWalletController } from "../../../controllers/GenerateNewWalletController.js";
import { ImportWalletController } from "../../../controllers/ImportWalletController.js";
import { LoginController } from "../../../controllers/LoginController.js";
import { MainMenuController } from "../../../controllers/MainMenuController.js";
import { ResetWalletController } from "../../../controllers/ResetWalletController.js";
import { NetworkRepositorySqlite } from "../../../models/networks/repository/implementation/NeworkRepositorySqlite.js";
import { WalletRepositorySqlite } from "../../../models/wallet/repository/implementations/WalletRepositorySqlite.js";
import { Screens } from "../../../shared/types/Screens.js";
import { ClipboardServiceClipboardy } from "../../clipboard/implementation/ClipboardServiceClipboardy.js";
import { CreateOrImportPrompt } from "../../prompt/create-or-import/CreateOrImportPrompt.js";
import { ConfirmationPrompt } from "../../prompt/generate-wallet/ConfirmationPrompt.js";
import { CreatePasswordPrompt } from "../../prompt/generate-wallet/CreatePasswordPrompt.js";
import { CreatePasswordForImportedWalletPrompt } from "../../prompt/import-wallet/CreatePasswordForImportedWalletPrompt.js";
import { ImportedWalletMnemonicPrompt } from "../../prompt/import-wallet/ImportedWalletMnemonicPrompt.js";
import { LoginOrResetPrompt } from "../../prompt/login-or-reset/LoginOrResetPrompt.js";
import { WalletPasswordPrompt } from "../../prompt/login/WalletPasswordPrompt.js";
import { MainMenuPrompt } from "../../prompt/main-menu-options/MainMenuPrompt.js";
import { ResetWalletConfirmationPrompt } from "../../prompt/reset/ResetWalletConfirmationPrompt.js";
import { Navigation } from "../Navigation.js";

export class AppNavigation implements Navigation {
	controllers: Record<Screens, Controller> = {
		"generate-wallet": new GenerateNewWalletController(
			new ConfirmationPrompt(),
			new CreatePasswordPrompt(),
			new WalletRepositorySqlite(),
			this
		),
		auth: new AuthController(
			new CreateOrImportPrompt(),
			new LoginOrResetPrompt(),
			this,
			new WalletRepositorySqlite()
		),
		login: new LoginController(
			new WalletRepositorySqlite(),
			this,
			new WalletPasswordPrompt()
		),
		reset: new ResetWalletController(
			new ResetWalletConfirmationPrompt(),
			new WalletRepositorySqlite(),
			this
		),
		"import-wallet": new ImportWalletController(
			new ImportedWalletMnemonicPrompt(),
			new WalletRepositorySqlite(),
			new CreatePasswordForImportedWalletPrompt(),
			this
		),
		"main-menu": new MainMenuController(
			new NetworkRepositorySqlite(),
			this,
			new MainMenuPrompt()
		),
		"copy-to-clipboard": new CopyToClipBoardController(
			new ClipboardServiceClipboardy(),
			this
		)
	};

	async navigateTo(screen: Screens): Promise<void> {
		await this.controllers[screen].handle();
	}
}
