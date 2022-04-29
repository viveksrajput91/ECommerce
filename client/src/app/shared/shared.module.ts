import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()    
  ],
  exports:[    
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalComponent
  ]  
})
export class SharedModule { }
