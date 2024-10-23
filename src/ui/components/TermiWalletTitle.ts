// import figlet from "figlet";

import figlet from "figlet";
import { MarginLeft } from "./MarginLeft.js";
import { LineBreak } from "./LineBreak.js";

export class TermiWalletTitle {
    
    static render() {
        console.log(figlet.textSync("TermiWallet",{
            horizontalLayout:"controlled smushing"
        }))
        MarginLeft.render(" Your Ethereum personal wallet in the terminal!")
        LineBreak.render()
    }
}


