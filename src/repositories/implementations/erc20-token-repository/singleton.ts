import { IERC20TokenRepository } from "../../interfaces/IERC20TokenRepository.js";
import { ERC20TokenRepository } from "./ERC20TokenRepository.js";


let erc20TokenRepository:IERC20TokenRepository


export function getErc20TokenRepository():IERC20TokenRepository{
    if(erc20TokenRepository){
        return erc20TokenRepository
    }
    erc20TokenRepository = new ERC20TokenRepository()
    return erc20TokenRepository
}