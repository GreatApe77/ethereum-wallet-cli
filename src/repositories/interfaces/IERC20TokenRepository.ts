import { IERC20Token } from "../../models/interfaces/IERC20Token.js";

export interface IERC20TokenRepository{
    save(token:IERC20Token):Promise<void>
    getAll():Promise<IERC20Token[]>
    delete(address:string):Promise<void>
}