import { Product } from "./product.model"

export interface Item{

    idDTO: string,
    productDTO: Product,
    quantityDTO: number,
    subTotalDTO: number
}