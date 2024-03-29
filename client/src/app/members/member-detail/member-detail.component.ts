import { Component, OnInit } from '@angular/core';
import { Member } from './../../_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit{
  member:Member|undefined;
  galleryOptions:NgxGalleryOptions[]=[];
  galleryImages:NgxGalleryImage[]=[];

  
  constructor(private memberService:MembersService,private rout:ActivatedRoute) { }
  ngOnInit(): void {
    this.looadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        thumbnailsColumns: 4,
        imagePercent:100,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview:false
      },
    ];
  
  }
  looadMember(){
    const username=this.rout.snapshot.paramMap.get('username');
    if(!username)return;
    this.memberService.getMember(username).subscribe({
      next:member=>{
        this.member=member;
        this.galleryImages =this.getImages();
      },
      error:err=>alert(`Error :${err.message}`)
    })
  }
  getImages() {
    if(!this.member)return[];
    const imgUrls=[];
    for(const photo of this.member.photos){
      imgUrls.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url
      });
  }
  return imgUrls;
  
}
}
 
