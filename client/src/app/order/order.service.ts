import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseApiUrl;
  constructor(private httpClient:HttpClient) { }

  getOrdersForUser()
  {
    return this.httpClient.get(this.baseUrl + 'orders');
    
  }

  getOrderDetailed(id:number)
  {
    return this.httpClient.get(this.baseUrl + 'orders/' + id);
  }
}
