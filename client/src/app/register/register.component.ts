import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements  OnInit {
  // this will be an array of objects coming from the home component
  //@Input() usersFromHomeComponent:any;
  @Output() cancelRegister=new EventEmitter();
  loggedIn: BehaviorSubject<boolean>=new BehaviorSubject(false);

model:any={}
  constructor(public accountService:AccountService, private toastr:ToastrService) {
    
  }
  ngOnInit():void{
    
  }
  register(){
    this.accountService.register(this.model).subscribe({
      next:()=>{
        this.cancel();
      },
      error:error=>{
        console.log(error);
        this.toastr.error(error.error);}
    })
   
  }
  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
