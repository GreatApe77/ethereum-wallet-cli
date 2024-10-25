import { FancyDivider } from "../ui/components/FancyDivider.js";
import { FancyTitle } from "../ui/components/FancyTitle.js";
import { Controller } from "./Controller.js";

export class MainMenuController implements Controller{
    async handle(): Promise<void> {
        FancyDivider.render()
        FancyTitle.render("Main Menu")
        FancyDivider.render()
        
    }
    
}