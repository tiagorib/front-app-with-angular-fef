import { Category } from "./category";

export interface Product {
    idProduct?: any;
    nameProduct: string;
    descriptionProduct: string;
    skuProduct: any;
    eanProduct: any;
    costPriceProduct: any;
    amountProduct: string;
    publishedProduct: boolean;
    dateCreatedProduct: any;
    category: any;
}