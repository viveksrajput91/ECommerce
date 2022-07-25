import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IPagination } from './shared/models/pagination';
import { IProduct } from './shared/models/product';
import { abc } from './test';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ecommerce';
  
  constructor(private basketService:BasketService,private accountService:AccountService)
  {}
  
  ngOnInit(): void {  
   this.loadBasket();
   this.loadCurrentUser();
  }

  loadCurrentUser()
  {
    const token=localStorage.getItem("token");
      this.accountService.loadCurrentUser(token).subscribe({
        next:()=>{console.log("user is logged in")},
        error:(err:any)=>{console.log(err)}
      });
  }

  loadBasket()
  {
    const basketId=localStorage.getItem('basket_id');
    if(basketId)
    {
      this.basketService.getBasket(basketId).subscribe({
        next:()=>console.log("Initialisation Done"),
        error:(error)=>console.log(error)
      })
    }
  }
}
