import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { MdSnackBar } from '@angular/material'

@Injectable()
export class UserService {
  constructor(private http:Http,private snackBar:MdSnackBar) { }

  login(data:any){
    let url = `http://localhost:4444/api/login`;
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
                    .map(res=>res);
  }

  signUp(data:any){
    let url = `http://localhost:4444/api/signup`
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
                    .map(res=>res);
  }

  logout(){
    let url = `http://localhost:4444/api/logout`;
    let body = JSON.stringify({});
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
                    .map(res=>res);
  }

  isAuth(){
    let url = `http://localhost:4444/api/auth`;
    return this.http.get(url)
                    .map(res=>res);
  }

  openSnackBar(message:string){
    this.snackBar.open(message,'OK',{
      duration:2500
    });
  }
}
