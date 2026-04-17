
import { Screens } from "../../shared/types/Screens.js";
import { Navigation } from "../../domain/services/Navigation.js";
import { Presenter } from "../../presentation/presenters/Presenter.js";
import { locator } from "../../core/di/diContainer.js";

import { AddChainPresenter } from "../../presentation/presenters/AddChainPresenter.js";
import { AuthPresenter } from "../../presentation/presenters/AuthPresenter.js";
import { CopyToClipboardPresenter } from "../../presentation/presenters/CopyToClipboardPresenter.js";
import { GenerateNewWalletPresenter } from "../../presentation/presenters/GenerateNewWalletPresenter.js";
import { GenerateQrCodePresenter } from "../../presentation/presenters/GenerateQrCodePresenter.js";
import { ImportWalletPresenter } from "../../presentation/presenters/ImportWalletPresenter.js";
import { LoginPresenter } from "../../presentation/presenters/LoginPresenter.js";
import { LogoutPresenter } from "../../presentation/presenters/LogoutPresenter.js";
import { MainMenuPresenter } from "../../presentation/presenters/MainMenuPresenter.js";
import { NetworksMenuPresenter } from "../../presentation/presenters/NetworksMenuPresenter.js";
import { ResetWalletPresenter } from "../../presentation/presenters/ResetWalletPresenter.js";
import { SendTransactionPresenter } from "../../presentation/presenters/SendTransactionPresenter.js";
import { SwitchAccountPresenter } from "../../presentation/presenters/SwitchAccountPresenter.js";
import { SwitchNetworkPresenter } from "../../presentation/presenters/SwitchNetworkPresenter.js";

export class AppNavigation implements Navigation {
	private controllers: Record<Screens, Presenter> | undefined;

	public bootstrapControllers():void{
		this.controllers = {
			"generate-wallet": locator.get(GenerateNewWalletPresenter),
			auth: locator.get(AuthPresenter),
			login: locator.get(LoginPresenter),
			reset: locator.get(ResetWalletPresenter),
			"import-wallet": locator.get(ImportWalletPresenter),
			"main-menu": locator.get(MainMenuPresenter),
			"copy-to-clipboard": locator.get(CopyToClipboardPresenter),
			"switch-account": locator.get(SwitchAccountPresenter),
			logout: locator.get(LogoutPresenter),
			"qr-code": locator.get(GenerateQrCodePresenter),
			"networks-menu": locator.get(NetworksMenuPresenter),
			"switch-network": locator.get(SwitchNetworkPresenter),
			"add-network": locator.get(AddChainPresenter),
			"send-transaction": locator.get(SendTransactionPresenter)
		};
	}
	private getController(screen: Screens): Presenter {
		return this.controllers![screen];
	}
	async navigateTo(screen: Screens): Promise<void> {
		await this.getController(screen).handle();
	}
}
