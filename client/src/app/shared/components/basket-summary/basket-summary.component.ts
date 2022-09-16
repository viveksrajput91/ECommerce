import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  @Output() increment:EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Output() decrement:EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Output() remove:EventEmitter<IBasketItem>=new EventEmitter<IBasketItem>();
  @Input() isBasket=true;
  @Input() items : IBasketItem[] | IOrderItem[] =[];
  @Input() isOrder=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  incrementBasketItem(item:IBasketItem)
  {
    this.increment.emit(item);
  }

  decrementBasketItem(item:IBasketItem)
  {
    this.decrement.emit(item);
  }

  removeItemFromBasket(item:IBasketItem)
  {
    console.log('Emit remove basket item');
    this.remove.emit(item);
  }

}
