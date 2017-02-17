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

}
