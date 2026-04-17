import { Screens } from "../../shared/types/Screens.js";

export abstract class Navigation {
    abstract navigateTo(route: Screens): Promise<void>;
}