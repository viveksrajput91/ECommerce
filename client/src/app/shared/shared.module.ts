import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './components/pagination-header/pagination-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CdkStepperModule
  ],
  exports:[    
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalComponent,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    RouterModule
  ]  
})
export class SharedModule { }
