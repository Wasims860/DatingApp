import {  CanActivate } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from './../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService:AccountService,private toastr:ToastrService) {}
  canActivate():Observable<boolean>  {
    return this.accountService.currentUser$.pipe(
      map(user=>{
        if(user!=null) return true
        else{
          this.toastr.error("Not Allowed");
          return false
        }
      })
    )
  }

    
  }
