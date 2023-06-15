import { Category } from "./category";

export interface Product{
    idProduct?: any;
    nameProduct: string;
    descriptionProduct: string;
    skuProduct: any;
    eanProduct: any;
    costPriceProduct: string;
    amountProduct: string;
    dateCreatedProduct: any;
    publishedProduct: boolean;
    idCategory?: any;
}

