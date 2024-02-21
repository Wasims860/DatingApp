import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BehaviorSubject, Observable, of, take } from 'rxjs';
import * as moment from 'moment';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
model:any={};

constructor(public accountService:AccountService,private router:Router,
  private toastr:ToastrService) {
 
}
  ngOnInit(): void {
    this.accountService.currentUser$
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
    next:()=>this.router.navigateByUrl('/members'),
    error:error=>this.toastr.error(error.error)
  })
}
logout(){
  this.accountService.logout();
  this.router.navigateByUrl('/');
}
}
