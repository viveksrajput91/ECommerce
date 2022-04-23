import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busyServiceCount=0;

  constructor(private ngxSpinnerService:NgxSpinnerService) { }

  busy()
  {
    this.busyServiceCount++;
    this.ngxSpinnerService.show(undefined,{
      type:'timer',
      bdColor:"rgba(255,255,255,0.7)",
      color:"#333333"
    });
  }

  idle()
  {
    this.busyServiceCount--;
    if(this.busyServiceCount <=0)
    {
      this.busyServiceCount=0;
      this.ngxSpinnerService.hide();
    }
  }
}
