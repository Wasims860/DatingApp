export interface User
{
    userName:string;
    token:string;
    photoUrl:string;
    message:string;
    isAuthenticated:boolean;
    email:string;
    expiresOn:Date;
    refreshTokenExpiration:Date;
    role:string[];

}