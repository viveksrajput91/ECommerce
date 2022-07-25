import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BasketTestComponent } from './basket-test/basket-test.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BasketComponent,BasketTestComponent
  ],
  imports: [
    CommonModule,
    //BasketRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class BasketModule { }
