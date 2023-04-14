import { Cart } from "./cart.model";
import { User } from "./user.model";

export interface Receipt{
    id: string,
    cart: Cart | undefined,
    createDate: Date | undefined,
    user: User | undefined,
    phone: string,
    address: string 
}