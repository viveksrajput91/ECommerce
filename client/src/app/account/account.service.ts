import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, of, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl= environment.baseApiUrl;
  private currentUserSource=new ReplaySubject<IUser>(1);
  currentUser$=this.currentUserSource.asObservable();

  constructor(private httpClient:HttpClient,private router:Router) { }


  loadCurrentUser(token:string)
  {
    if(token===null)
    {
      this.currentUserSource.next(null);
      return of(null);
    }
    let header=new HttpHeaders();
    header=header.set("Authorization",`Bearer ${token}`);
    return this.httpClient.get(this.baseUrl + "account",{headers:header}).pipe(
      map((user:IUser)=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values:any)
  {
    return this.httpClient.post(this.baseUrl + 'account/login',values).pipe(
      map((user:IUser)=>{
        if(user)
        {
          localStorage.setItem('token',user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  register(values:any)
  {
    return this.httpClient.post(this.baseUrl + "account/register",values).pipe(
      map((user:IUser)=>{
        if(user)
        {
          localStorage.setItem("token",user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout()
  {
    localStorage.removeItem("token");
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

  emailExist(email:string)
  {
    return this.httpClient.get(this.baseUrl + "account/emailexists?email=" + email);
  }

  getAddress()
  {
    return this.httpClient.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateAddress(address : IAddress)
  {
    return this.httpClient.put<IAddress>(this.baseUrl + 'account/address',address);
  }
}