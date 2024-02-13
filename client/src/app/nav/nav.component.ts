import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as moment from 'moment';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
model:any={};
loggedIn: BehaviorSubject<boolean>=new BehaviorSubject(false);
currentUser$:Observable<User |null>=of(null);
/**
 *
 */
constructor(public accountService:AccountService) {
 
}
  ngOnInit(): void {
    //this.currentUser$=this.accountService.currentUser$;
    this.accountService.currentUser$.subscribe({ //What to do next
       next:user=>{
          if(user!=null && moment(user.expiresOn)>=moment())
          {
        this.model=user;   
      }
    },
     error:error=>console.log(error)
   })
  }
//مثال عن observables 
//Subscribe من أجل جلب البيانات
//getCurrentUser(){
  //this.accountService.currentuser$.subscribe({ //What to do next
  //  next:user=>{
   //   if(user!=null && moment(user.expiresOn)>=moment())
      //{
  //  this.loggedIn.next(true);
   // this.model=user;   
  // }
 // },
   // error:error=>console.log(error)
  //})
//}


login(){
  this.accountService.login(this.model).subscribe({
    next:(response)=>{
      console.log(response);
      this.loggedIn.next(true);
    },
    error:error=>console.log(error)
  })
}
logout(){
  this.accountService.logout();
}
}
