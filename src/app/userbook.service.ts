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
      .map(res=>res.json());
  }

  getAllBook(limit:number,offset:number){
    let url = `http://localhost:4444/api/book?limit=${limit}&offset=${offset}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  getUserBooks(limit:number,offset:number){
    let url = `http://localhost:4444/api/book/user?limit=${limit}&offset=${offset}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  getUserBorrowedBooks(limit:number,offset:number){
    let url = `http://localhost:4444/api/book/user?owner=1&limit=${limit}&offset=${offset}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  tradeRequests(limit:number,offset:number){
    let url = `http://localhost:4444/api/requested/book?limit=${limit}&offset=${offset}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  mytradeRequests(limit:number,offset:number){
    let url = `http://localhost:4444/api/offered/book?limit=${limit}&offset=${offset}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  getOwner(bookId:string){
    let url = `http://localhost:4444/api/book/owner/${bookId}`;
    return this.http.get(url)
      .map(res=>res.json());
  }

  requestBook(ownerId:string,bookId:string){
    let url = `http://localhost:4444/api/request/${bookId}`;
    let body = JSON.stringify({});
    let headers = new Headers({
      'Content-Type':'application/json',
      'ownerID':ownerId
    });
    let reqOptions = new RequestOptions({headers:headers});
    return this.http.post(url,body,reqOptions)
      .map(res=>res.json());
  }

  deleteUserBook(userbookId:string){
    let url = `http://localhost:4444/api/book/user/${userbookId}`;
    let body = JSON.stringify({});
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let reqOptions = new RequestOptions({headers:headers});
    return this.http.delete(url,reqOptions)
      .map(res=>res.json());
  }

  approveTrade(requestId:string){
    let url = `http://localhost:4444/api/approve/book/${requestId}`;
    let body = JSON.stringify({});
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let reqOptions = new RequestOptions({headers:headers});
    return this.http.put(url,reqOptions)
      .map(res=>res.json());
  }

  rejectTrade(requestId:string){
    let url = `http://localhost:4444/api/approve/book/${requestId}`;
    let body = JSON.stringify({});
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let reqOptions = new RequestOptions({headers:headers});
    return this.http.delete(url,reqOptions)
      .map(res=>res);
  }
}
