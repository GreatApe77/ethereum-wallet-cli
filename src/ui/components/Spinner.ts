import { Spinner as NanoSpinner,createSpinner } from "nanospinner";
export class Spinner{
    private static  spinner:NanoSpinner =createSpinner()

    static start(message:string="Loading"){
        this.spinner.start({
            text:message,

        })
    }
    static stop(){
        this.spinner.stop()
    }
    static success(message:string="Success"){
        this.spinner.success({
            text:message
        })
    }
    
}
