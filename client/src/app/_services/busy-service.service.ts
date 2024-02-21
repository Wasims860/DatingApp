import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyServiceService {
  busyRequestCount=0;

  constructor(private spinnerService:NgxSpinnerService) { }
  busy(){
    this.busyRequestCount++;
    this.spinnerService.show(undefined,{
      bdColor : "rgba(0, 0, 0, 0.8)" ,
      size : "medium",
       color : "#c73939" ,
       type: "pacman",
       fullScreen:true
      
    }); // show loading spinner for all requests
  }
  idle(){
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0){
        this.busyRequestCount = 0;
        this.spinnerService.hide(); // hide loading spinner when no more request are
  }
}
}
