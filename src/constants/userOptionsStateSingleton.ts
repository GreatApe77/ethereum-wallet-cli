import { UserOptionsState } from "../lib/UserOptionsState.js";


let userOptionsState:UserOptionsState | null = null

function getUserOptionsState(){
    if(userOptionsState === null){
        userOptionsState = new UserOptionsState()
    }
    return userOptionsState
}

export {getUserOptionsState}