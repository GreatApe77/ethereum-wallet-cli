import figlet from "figlet";

export class FancyDivider {
    static render() {
        console.log(figlet.textSync("======================",{
            font:"Stampatello",
            horizontalLayout:"controlled smushing"
        }))
    }
}