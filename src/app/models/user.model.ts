import { Cart } from "./cart.model";

export interface User{
    id: string,
    name: string,
    lastName: string,
    email : string,
    password: string,
    //cartDTO: Cart
}