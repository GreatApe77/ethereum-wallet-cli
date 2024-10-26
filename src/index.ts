import inquirer from "inquirer"
import { DatabaseSqlite } from "./db/implementations/DatabaseSqlite.js"
import { SettingsFs } from "./models/settings/implementations/SettingsFs.js"
import { AppNavigation } from "./services/navigation/implementations/AppNavigation.js"
import InterruptedPrompt from "inquirer-interrupted-prompt"
import { AppContainer } from "./AppContainer.js"
InterruptedPrompt.fromAll(inquirer)
async function main(){
    const settings =SettingsFs.getInstance()
    const db = DatabaseSqlite.getInstance()
    if(settings.settings.needsMigration){
        await db.migrate()
        settings.settings.needsMigration = false
        settings.save()
    }
    if(settings.settings.needsSeed){
        await db.seed()
        settings.settings.needsSeed = false
        settings.save()
    }
    AppContainer.getInstance().bootstrap()
    const navigationService = new AppNavigation()
    navigationService.bootstrapControllers()
    
    await navigationService.navigateTo("auth")
}


main()
.catch(console.error)