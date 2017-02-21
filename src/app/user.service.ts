import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MdSnackBar } from '@angular/material'

@Injectable()
export class UserService {
  constructor(private http:Http,private snackBar:MdSnackBar) { }

  login(data:any){
    let url = `/api/login`;
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
                    .map(res=>res);
  }

  signUp(data:any){
    let url = `/api/signup`
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
                    .map(res=>res);
  }

  logout(){
    let url = `/api/logout`;
    let body = JSON.stringify({});
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
                    .map(res=>res);
  }

  isAuth(){
    let url = `/api/auth`;
    return this.http.get(url)
                    .map(res=>res);
  }

  getUserInfo(){
    let url = `/api/user`;
    return this.http.get(url)
                   .map(res=>res.json());
  }

  updateUserInfo(data:any){
    let url = `/api/user`;
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});
    return  this.http.put(url,body,reqOptions)
                     .map(res=>res.json());
  }

  changeUserPassword(data:any){
    let url = `/api/user/password`;
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});
    return this.http.put(url,body,reqOptions)
                    .map(res=>res.json());
  }

  openSnackBar(message:string){
    this.snackBar.open(message,'OK',{
      duration:3000
    });
  }
}
