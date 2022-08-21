import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotal } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl=environment.baseApiUrl;  
  private basketSource=new BehaviorSubject<IBasket>(null);
  basket$=this.basketSource.asObservable();
  private basketTotalSource=new BehaviorSubject<IBasketTotal>(null);
  basketTotal$=this.basketTotalSource.asObservable();
  shippingPrice =0;

  constructor(private http:HttpClient) { }

  updateShippingPrice(deliveryMethod:IDeliveryMethod)
  {
    this.shippingPrice=deliveryMethod.price;
    this.calculateBasketTotal();
  }

  getBasket(id:string)
  {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(map((basket:IBasket)=>{
      this.basketSource.next(basket);
      this.calculateBasketTotal();
    }))
  }

  updateBasket(basket:IBasket)
  {
    return this.http.post(this.baseUrl + "basket",basket).subscribe({
      next:(basket:IBasket)=>{
        this.basketSource.next(basket);
        this.calculateBasketTotal();
      }
    ,error:(error:any)=>console.log(error)})
  }

  getCurrentBasket()
  {
    return this.basketSource.value;
  }

  addItemToBasket(item:IProduct,quantity=1){    
    const itemToAdd:IBasketItem=this.mapProductItemToBasketItem(item,quantity);    
    var basket=this.getCurrentBasket()??this.createBasket();
    basket.items=this.addOrUpdateItem(basket.items,itemToAdd,quantity);
    this.updateBasket(basket);
    console.log(basket);
  }

  incrementBasketItem(basketItem:IBasketItem)
  {
    const basket=this.getCurrentBasket();
    const basketItemIndex=basket.items.findIndex(i=>i.id===basketItem.id);
    basket.items[basketItemIndex].quantity++;
    this.updateBasket(basket);
  }

  decrementBasketItem(basketItem:IBasketItem)
  {
    const basket=this.getCurrentBasket();
    const basketItemIndex=basket.items.findIndex(i=>i.id===basketItem.id);
    if(basket.items[basketItemIndex].quantity > 1)
    {
      basket.items[basketItemIndex].quantity--;
      this.updateBasket(basket);
    }
    else
    {
      this.removeBasketItem(basketItem);
    }
  }

  removeBasketItem(basketItem: IBasketItem) {
    const basket=this.getCurrentBasket();
    if(basket.items.some(i=>i.id===basketItem.id))
    {
      basket.items=basket.items.filter(i=>i.id !==basketItem.id);
    }
    if(basket.items.length > 0)
    {
      this.updateBasket(basket)
    }
    else
    {
      this.deleteBasket(basket);
    }
  }

  deleteLocalBasket()
  {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    this.http.delete(this.baseUrl + "basket?id=" + basket.id).subscribe({
      next:()=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem("basket_id");
      }
    })
  }

  addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i=>i.id===itemToAdd.id);
    if(index ===-1)
    {
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }
    else
    {
      items[index].quantity +=quantity;
    }
    return items;
  }
  
  private createBasket(): IBasket {
    var basket= new Basket();
    localStorage.setItem('basket_id',basket.id);
    return basket;
  }

  private calculateBasketTotal()
  {
    const basket=this.getCurrentBasket();
    const shipping=this.shippingPrice;
    const subTotal=basket.items.reduce((a,b)=>(b.quantity*b.price) +a,0);
    const total=shipping + subTotal;
    this.basketTotalSource.next({shipping,subTotal,total});
  }

  mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id:item.id,
      productName:item.name,
      pictureUrl:item.pictureUrl,
      price:item.price,
      quantity,
      brand:item.productBrand,
      type:item.productType
    };
  }
}
