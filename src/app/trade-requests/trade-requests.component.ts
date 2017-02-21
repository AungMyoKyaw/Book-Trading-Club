import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserbookService } from '../userbook.service';

@Component({
  selector: 'app-trade-requests',
  templateUrl: './trade-requests.component.html',
  styleUrls: ['./trade-requests.component.css'],
  providers:[UserService,UserbookService]
})
export class TradeRequestsComponent implements OnInit {books = [];
  cols:number = 6;
  more:boolean = false;
  loading:boolean = true;
  limit:number = 20;
  offset:number = 0;
  approving:boolean = false;
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

  tradeRequests(){
    this.setCols();
    this.userBookService.tradeRequests(this.limit,this.offset)
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
    this.tradeRequests();
  }

  approve(requestedId:string){
    this.approving = true;
    this.userBookService.approveTrade(requestedId)
      .subscribe(success=>{
        this.approving = false;
        this.loading = true;
        this.books = [];
        this.offset = 0;
        this.tradeRequests();
      },
      error=>{
        this.approving = false;
        this.userService.openSnackBar('Error on approving trade request');
      });
  }

  reject(requestedId:string){
    this.approving = true;
    this.userBookService.rejectTrade(requestedId)
      .subscribe(success=>{
        this.approving = false;
        this.loading = true;
        this.books = [];
        this.offset = 0;
        this.tradeRequests();
      },
      error=>{
        this.approving = false;
        this.userService.openSnackBar('Error on approving trade request');
      });
  }

  ngOnInit() {
    this.tradeRequests();
  }

}
