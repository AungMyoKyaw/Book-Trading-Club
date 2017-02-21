import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserbookService } from '../userbook.service';

@Component({
  selector: 'app-my-trade-requests',
  templateUrl: './my-trade-requests.component.html',
  styleUrls: ['./my-trade-requests.component.css'],
  providers:[UserService,UserbookService]

})
export class MyTradeRequestsComponent implements OnInit {
  cols:number = 6;
  books = [];
  more:boolean = false;
  loading:boolean = true;
  limit:number = 20;
  offset:number = 0;
  nobook:boolean = false;

  constructor(
    private userBookService:UserbookService,
    private userService:UserService
    ) { }

  setCols(){
    if(window.innerWidth <= 480){
      this.cols = 2;
    } else if(window.innerWidth>480 && window.innerWidth<960) {
      this.cols = 3;
    } else {
      this.cols = 6;
    }
  }

  mytradeRequests(){
    this.setCols();
    this.userBookService.mytradeRequests(this.limit,this.offset)
      .subscribe(books=>{
        books.books.length ? this.nobook = false : this.nobook = true;
        this.loading = false;
        this.offset = books.currentPage * this.limit;
        this.books = this.books.concat(books.books);
        if(books.pageCount==books.currentPage){
          this.more = false;
        } else {
          this.more = true;
        }
      },
      error=>{
        this.loading = false;
        this.userService.openSnackBar(error.statusText);
      })
  }

  loadMore(){
    this.loading = true;
    this.mytradeRequests();
  }

  ngOnInit() {
    this.mytradeRequests();
  }

}
