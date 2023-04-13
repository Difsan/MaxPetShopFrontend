import { Product } from "./product.model"

export interface Item{

    id: string|undefined,
    product: Product | undefined,
    quantity: number,
    subTotal: number
}