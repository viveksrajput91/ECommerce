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

  constructor(private shopService:ShopService) { }

  ngOnInit()
  {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts()
  {
    this.shopService.getProducts(this.shopParams).subscribe(response=>{
      this.products=response.data;
      this.shopParams.pageNumber=response.pageIndex;
      this.shopParams.pageSize=response.pageSize;
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
    this.shopParams.brandId=brandId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onTypeSelected(typeId:number)
  {
    this.shopParams.typeId=typeId;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onSorting(sortBy:string)
  {
    this.shopParams.sort=sortBy;
    this.getProducts();
  }

  onPageChanged(pageNumber:number)
  {
    if(pageNumber !== this.shopParams.pageNumber)
    {
      this.shopParams.pageNumber=pageNumber;    
      this.getProducts();
    }
  }

  onSearch()
  {
    this.shopParams.search=this.searchValue.nativeElement.value;
    this.shopParams.pageNumber=1;
    this.getProducts();
  }

  onReset()
  {
    this.searchValue.nativeElement.value="";
    this.shopParams=new shopParams();
    this.getProducts();
  }

}
