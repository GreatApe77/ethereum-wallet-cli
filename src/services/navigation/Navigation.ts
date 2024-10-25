import { Screens } from "../../shared/types/Screens.js";

export interface Navigation{
    navigateTo(route: Screens): Promise<void>;
    
}