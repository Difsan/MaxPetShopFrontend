import { Item } from "./item.model";

export interface Cart{
    id: string,
    items: Item[],
    totalPrice: number
}