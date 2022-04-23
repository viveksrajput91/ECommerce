import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:IProduct;

  constructor(private shopService:ShopService,private activatedRoute:ActivatedRoute,private breadcrumbService:BreadcrumbService) {  
    this.breadcrumbService.set("@productDetails"," ");   
  }

  ngOnInit(): void {
    this.getProduct();    
  }

  getProduct()
  {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe({    
      next:(response) => {this.product=response; this.breadcrumbService.set("@productDetails",response.name);},
      error:(error)=>console.log(error) 
    });
  }

}
