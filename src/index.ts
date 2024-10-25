import inquirer from "inquirer"
import { DatabaseSqlite } from "./db/implementations/DatabaseSqlite.js"
import { SettingsFs } from "./models/settings/implementations/SettingsFs.js"
import { AppNavigation } from "./services/navigation/implementations/AppNavigation.js"
import InterruptedPrompt from "inquirer-interrupted-prompt"
InterruptedPrompt.fromAll(inquirer)
async function main(){
    const settings = new SettingsFs()
    const db = DatabaseSqlite.getInstance()
    if(settings.settings.needsSeed){
        await db.migrate()
        settings.settings.needsSeed = false
        settings.save()
    }
    const navigationService = new AppNavigation()
    await navigationService.navigateTo("auth")
}


main()
.catch(console.error)