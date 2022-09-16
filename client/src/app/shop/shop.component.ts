import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { shopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild("search",{static:false}) searchValue:ElementRef; 
  products:IProduct[];
  brands:IBrand[];
  types:IType[];
  shopParams=new shopParams();  
  sortOptions=[
    {name:"Alphabetical",value:"name"},
    {name:"Price: Low to High",value:"priceAsc"},
    {name:"Price: High to Low",value:"priceDesc"}
  ];
  totalCount:number;

  constructor(private shopService:ShopService) { 
    this.shopParams=this.shopService.getShopParams();
  }

  ngOnInit()
  {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
  }

  getProducts(isCache=false)
  {
    this.shopService.getProducts(isCache).subscribe(response=>{
      console.log(response.data);
      this.products=response.data;
      this.totalCount=response.count;
    });
  }

  getBrands()
  {
    this.shopService.getBrands().subscribe({
      next:response=>{
        this.brands=[{id:0,name:"All"},...response];
      },
      error:(error)=>{
        console.log(error);
      }      
    })
  }

  getTypes()
  {
    this.shopService.getTypes().subscribe(
      {
        next:(response)=>{
          this.types=[{id:0,name:"All"},...response];
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  onBrandSelected(brandId:number)
  {
    const params = this.shopService.getShopParams();
    params.brandId=brandId;
    params.pageNumber=1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onTypeSelected(typeId:number)
  {
    const params= this.shopService.getShopParams();
    params.typeId=typeId;
    params.pageNumber=1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSorting(sortBy:string)
  {
    const params = this.shopService.getShopParams();
    params.sort=sortBy;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onPageChanged(pageNumber:number)
  {
    const params = this.shopService.getShopParams();
    if(pageNumber !== params.pageNumber)
    {
      params.pageNumber=pageNumber;
      this.shopService.setShopParams(params);    
      this.getProducts(true);
    }
  }

  onSearch()
  {
    const params = this.shopService.getShopParams();
    params.search=this.searchValue.nativeElement.value;
    params.pageNumber=1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onReset()
  {
    this.searchValue.nativeElement.value="";
    this.shopParams = new shopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}
