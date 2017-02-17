import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserbookService {

  constructor(private http:Http) { }

  searchBook(title:string){
    let url = `http://localhost:4444/api/book/search?keyword=${title}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  addBook(book:any){
    let url = `http://localhost:4444/api/book/user`;
    let body = JSON.stringify(book);
    let headers = new Headers({'Content-Type':'application/json'});
    let reqOptions = new RequestOptions({headers:headers});

    return this.http.post(url,body,reqOptions)
      .map(res=>res);
  }
}
