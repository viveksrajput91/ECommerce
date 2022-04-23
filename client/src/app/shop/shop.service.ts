import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { shopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = "https://localhost:5001/api/";

  constructor(private httpClient: HttpClient) { }

  getProducts(shopParams: shopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append("brandId", shopParams.brandId);
    }

    if (shopParams.typeId !== 0) {
      params = params.append("typeId", shopParams.typeId);
    }

    if(shopParams.search)
    {
      params=params.append("search",shopParams.search);
    }

    params = params.append("sort", shopParams.sort);
    params= params.append("pageIndex",shopParams.pageNumber);
    params=params.append("pageSize",shopParams.pageSize);

    return this.httpClient.get<IPagination>(this.baseUrl + "products", { observe: "response", params })
      .pipe
      (
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id:number)
  {
    return this.httpClient.get<IProduct>(this.baseUrl + "products/" + id);
  }

  getBrands() {
    return this.httpClient.get<IBrand[]>(this.baseUrl + "products/brands");
  }

  getTypes() {
    return this.httpClient.get<IType[]>(this.baseUrl + "products/types");
  }
}
