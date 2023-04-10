import { Cart } from "./cart.model";
import { User } from "./user.model";

export interface Receipt{
    idDTO: string,
    cartDTO: Cart,
    createDateDTO: Date,
    userDTO: User,
    phoneDTO: string,
    addressDTO: string 
}