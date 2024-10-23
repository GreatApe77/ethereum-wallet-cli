import figlet from "figlet";

export class FancyTitle{
    static render(title:string){
        console.log(figlet.textSync(title))
    }
}