import { menuTitle } from "../../components/menuTitle.js";
import { printLineSpace } from "../../utils/printLineSpace.js";
import { printMarginLeft } from "../../utils/printMarginLeft.js";

export function printAddChainMenu(){
    menuTitle("Add Network")
    printLineSpace()
    printMarginLeft("Provide the Information for adding a custom Network:")
    printLineSpace()
    printMarginLeft("Press ESC to return")
    printLineSpace()
}