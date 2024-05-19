import { menuTitle } from "../../components/menuTitle.js";
import { printLineSpace } from "../../utils/printLineSpace.js";

export function printSwitchAccountMenu(accountConnected: string){

    menuTitle("Switch Account")
    printLineSpace()
    console.log(`Current Address: ${accountConnected}`)
    printLineSpace()

    /*     const switchAccountMenuTemplate = `
===========================
     Switch Account
===========================
Current Address: ${accountConnected}


Available Accounts:
1. Account 1 - 0x1234...5678
2. Account 2 - 0x2345...6789
3. Account 3 - 0x3456...7890

4. Add New Account
5. Back to Main Menu

Please enter the number corresponding to your choice:
`; */
}