import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketTotal } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutForm:FormGroup;
  basketTotal$:Observable<IBasketTotal>;

  constructor(private fb:FormBuilder,private accountService:AccountService,private basketService:BasketService) { }

  ngOnInit(): void {
    this.CreateCheckoutForm();
    this.getAddressFormValue();
    this.getDeliveryMethodValue();
    this.basketTotal$=this.basketService.basketTotal$;
  }

  CreateCheckoutForm()
  {
    this.checkoutForm=this.fb.group({
      addressForm:this.fb.group({
        firstName:[null,Validators.required],
        lastName:[null,Validators.required],
        street:[null,Validators.required],
        city:[null,Validators.required],
        state:[null,Validators.required],
        zipCode:[null,Validators.required]
      }),
      deliveryMethodForm:this.fb.group({
        deliveryMethod:[null,Validators.required]
      }),
      paymentForm:this.fb.group({
        nameOnCard:[null,Validators.required]
      })
    })
  }

  getAddressFormValue()
  {
    this.accountService.getAddress().subscribe(address=>{
      this.checkoutForm.get('addressForm').patchValue(address);
    })
  }

  getDeliveryMethodValue()
  {
    const basket = this.basketService.getCurrentBasket();
    if(basket.deliveryMethodId !==null)
    {
      this.checkoutForm.get("deliveryMethodForm").get("deliveryMethod").patchValue(basket.deliveryMethodId.toString());
    }
  }

}
