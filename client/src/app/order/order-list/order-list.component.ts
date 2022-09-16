import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders:IOrder[];

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.getOrdersForUser();
  }

  getOrdersForUser()
  {
    this.orderService.getOrdersForUser().subscribe({
      next:(orders:IOrder[]) =>{
        this.orders=orders;
        console.log(orders);
      },
      error:(error)=>{
        console.error(error);
        
      }
    });
  }

}
