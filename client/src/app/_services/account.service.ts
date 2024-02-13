import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl='https://localhost:5001/api/';
private currentUserSource=new BehaviorSubject<User | null>(null);
currentUser$=this.currentUserSource.asObservable();
constructor(private http:HttpClient) { }

//observables getCurrentUserهذا  الكود يمكنه أن يقرأ البيانات في الخاصية الحالية  للمستخدم عن طريق الاشتراك في البيانات المخزنة
login(model:any)
{
  return this.http.post<User>(this.baseUrl+'account/login',model).pipe(
    map((response:User)=>{
      console.log(response);
      const user=response;
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
    )
}
register(model:any)
{
  return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
    map(user=>{
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
    )
}
setCurrentUser(user:User){
  this.currentUserSource.next(user);
}

logout(){
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
}

}
