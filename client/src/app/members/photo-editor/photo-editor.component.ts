import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { AccountService } from './../../_services/account.service';
import { take } from 'rxjs';
import { Photo } from './../../_models/photo';
import { MembersService } from './../../_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member:Member|undefined;
  uploader:FileUploader|undefined;
  hasBaseDropZoneOver=false;
  baseUrl=environment.apiUrl;
 user:User|undefined;

  constructor(private accountService:AccountService,private membersService:MembersService) {
  this.accountService.currentUser$.pipe(take(1)).subscribe({
    next:(user)=>{
      if(user!==null)
      {
        this.user=user
      }
    }
  })
    
  }
  ngOnInit(): void {
    this.initializeUploader();
  }
  fileOverBase(e:any){
    this.hasBaseDropZoneOver=e;
  }
setMainPhoto(photo:Photo){
  this.membersService.setMainPhoto(photo.id).subscribe({
    next:()=>{
      if(this.user&& this.member){
        this.member.photoUrl=photo.url;
        this.member.photos.forEach(p =>{
          if(p.isMain)p.isMain=false;
          if(p.id===photo.id)p.isMain=true;
        });
        this.accountService.setCurrentUser(this.user);
      }
    }
  })
}
deletePhoto(photoId:number){
  this.membersService.deletePhoto(photoId).subscribe({
    next:()=>{
      if(this.member){
    this.member.photos=this.member.photos.filter(x=>x.id!==photoId)      }
    }
  })
}
  initializeUploader(){
    this.uploader=new FileUploader({
      url:this.baseUrl+'users/add-photo',
      authToken:'Bearer '+this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024 //10MB
    });
    this.uploader.onAfterAddingFile=(file)=>{
      file.withCredentials=false
    }
    this.uploader.onSuccessItem= (item, response, status, headers)=>{
      if(response){
        const Photo=JSON.parse(response);
        this.member?.photos.push(Photo);
        if(Photo.isMain&&this.user&&this.member){
          this.user.photoUrl=Photo.url;
          this.member.photoUrl=Photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }

    }
  }

}
