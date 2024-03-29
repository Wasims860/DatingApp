import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseUrl=environment.apiUrl;
members:Member[]=[];
  constructor(private http:HttpClient) { }

  getMembers(){
    if(this.members.length>0)return of(this.members);
    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
      map((responseData)=>{
        //console.log(responseData);
        this.members=responseData;
        return this.members;
      })
    );
  }
  getMember(username:string){
    const member=this.members.find(x=>x.userName===username);
    if(member) return of(member);
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>{
        const index=this.members.indexOf(member);
        this.members[index]={...this.members[index], ...member};
      })
    );
  }
  setMainPhoto(phtoId:number){
    return this.http.put(this.baseUrl+'users/set-main-photo/'+phtoId,{});
  }
  deletePhoto(phtoId:number){
    return this.http.delete(this.baseUrl+'users/delete-photo/'+phtoId,{});
  }
}

