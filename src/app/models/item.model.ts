import { Product } from "./product.model"

export interface Item{

    id: string,
    product: Product,
    quantity: number,
    subTotal: number
}