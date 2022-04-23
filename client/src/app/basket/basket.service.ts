import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket } from '../shared/models/basket';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl=environment.baseApiUrl;  
  private basketSource=new BehaviorSubject<IBasket>(null);
  basket$=this.basketSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id:string)
  {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(map((basket:IBasket)=>{
      this.basketSource.next(basket);
    }))
  }

  updateBasket(basket:IBasket)
  {
    return this.http.post(this.baseUrl + "/basket",basket).subscribe({
      next:(basket:IBasket)=>{
        this.basketSource.next(basket);
      }
    ,error:(error:any)=>console.log(error)})
  }

  getCurrentBasket()
  {
    return this.basketSource.value;
  }
}
