import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IOrder } from 'src/app/shared/models/order';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  @Input() checkoutForm:FormGroup;

  constructor(private basketService:BasketService,private checkoutService:CheckoutService,private toastrService:ToastrService,private router:Router) { }

  ngOnInit(): void {
  }

  createOrder()
  {
    const basket = this.basketService.getCurrentBasket();
    const orderToCreate = this.getOrderToCreate(basket);
    this.checkoutService.createOrder(orderToCreate).subscribe(
    {
      next : (order:IOrder) =>{
      this.toastrService.success('Order created successfully');
      this.basketService.deleteLocalBasket();
      var navigationExtras:NavigationExtras={state:order};
      this.router.navigate(['/checkout/success'],navigationExtras);
      },
    error:(error)=>{
      this.toastrService.error(error);
      console.log(error);
    }
    });
  }

  getOrderToCreate(basket:IBasket)
  {
    return {
      basketId:basket.id,
      deliveryMethodId: +this.checkoutForm.get('deliveryMethodForm').get('deliveryMethod').value,
      shippingAddress:this.checkoutForm.get('addressForm').value
    } 
  }

}
