import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

 const routes : Routes =[
  {path:'',component:OrderListComponent},
  {path:':id',component:OrderDetailedComponent,data:{breadcrumb:{alias : 'orderDetailed'}}}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class OrderRoutingModule { }
