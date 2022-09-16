import { v4 as uuidv4 } from 'uuid';

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface IBasket {
    id: string;
    items: IBasketItem[];
    deliveryMethodId?:number;
    paymentIntentId?:string;
    clientSecret?:string;
    shippingPrice?:number;
}

export class Basket implements IBasket
{
    id= uuidv4();
    items: IBasketItem[]=[];    
}

export interface IBasketTotal
{
    shipping:number;
    subTotal:number;
    total:number;
}