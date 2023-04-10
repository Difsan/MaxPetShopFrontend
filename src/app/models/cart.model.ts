import { Item } from "./item.model";

export interface Cart{
    idDTO: string,
    itemsDTO: Item[],
    totalPrice: number
}