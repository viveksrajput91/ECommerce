import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './basket.component';
import { BasketTestComponent } from './basket-test/basket-test.component';


const routes:Routes=[
  {path:'',component:BasketComponent}, 
  {path:'/baskettest',component:BasketTestComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BasketRoutingModule { }
