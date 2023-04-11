import { Cart } from "./cart.model";
import { User } from "./user.model";

export interface Receipt{
    id: string,
    cart: Cart,
    createDate: Date,
    user: User,
    phone: string,
    address: string 
}