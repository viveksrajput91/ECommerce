import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotal } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$:Observable<IBasket>;
  basketTotal$:Observable<IBasketTotal>;

  constructor(private basketService:BasketService) { }

  ngOnInit(): void {    
    this.basket$=this.basketService.basket$;
    this.basketTotal$=this.basketService.basketTotal$;    
  }

  incrementBasketItem(item:IBasketItem)
  {
    this.basketService.incrementBasketItem(item);
  }

  decrementBasketItem(item:IBasketItem)
  {
    this.basketService.decrementBasketItem(item);
  }

  removeItemFromBasket(item:IBasketItem)
  {
    this.basketService.removeBasketItem(item);
  }

}
