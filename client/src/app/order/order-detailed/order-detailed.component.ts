import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  order:IOrder;

  constructor(private orderService:OrderService,private route:ActivatedRoute,private breadcrumbService:BreadcrumbService) 
  { 
    this.breadcrumbService.set('@orderDetailed','');
  }

  ngOnInit(): void {
    this.getOrderDetailed();
  }

  getOrderDetailed()
  {
    this.orderService.getOrderDetailed(+this.route.snapshot.paramMap.get('id')).subscribe({
      next:(order:IOrder)=>{
        this.order=order;
        this.breadcrumbService.set('@orderDetailed',`Order# ${order.id} - ${order.orderStatus}`);
      },
      error:(error)=>{console.error(error)}
      })
    }
  }
