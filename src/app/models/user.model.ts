import { Cart } from "./cart.model";

export interface User{
    idDTO: string,
    nameDTO: string,
    lastNameDTO: string,
    emailDTO : string,
    passwordDTO: string,
    //cartDTO: Cart
}