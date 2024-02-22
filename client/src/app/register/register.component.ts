import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  registerForm:FormGroup=new FormGroup({});
  maxDate:Date=new Date();
  validationErrors:string|undefined;

  constructor(public accountService:AccountService,
     private toastr:ToastrService,private fb:FormBuilder,private router:Router) {
    
  }
  ngOnInit():void{
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }
  initializeForm(){
    this.registerForm=this.fb.group({
      gender:['male'],
      userName:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      dateOfBirth:['',Validators.required],
      knownAs:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      email:['',Validators.email],
      password: ['',[Validators.minLength(4)
        ,Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required,this.matchValues('password')]]
    });
    //لفحص مااذا تغيرت قيمة كلمة السر المدخلة اولا
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    });
  }
  matchValues(matchTo:string){
    return(corntrol:AbstractControl)=>{
      return corntrol.value===corntrol.parent?.get(matchTo)?.value ? null : {notMatching:true};
    }
     }
  register(){
   
    this.accountService.register(this.registerForm.value).subscribe({
      next:()=>{
       this.router.navigate(['/members']);
      },
      error:error=>{
        this.validationErrors=error;
      }
    })
   
  }
  cancel(){
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
