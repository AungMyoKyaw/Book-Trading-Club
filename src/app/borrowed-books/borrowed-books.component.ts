import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserbookService } from '../userbook.service';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css'],
  providers: [UserService,UserbookService]
})
export class BorrowedBooksComponent implements OnInit {
  borrowedBooks = [];
  cols:number = 6;
  more:boolean = false;
  loading:boolean = true;
  limit:number = 20;
  offset:number = 0;

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

  getUserBorrowedBooks(){
    this.setCols();
    this.userBookService.getUserBorrowedBooks(this.limit,this.offset)
      .subscribe(books=>{
        console.log(books);
        this.loading = false;
        this.offset = books.currentPage * this.limit;
        this.borrowedBooks = this.borrowedBooks.concat(books.userbooks);
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
    this.getUserBorrowedBooks();
  }

  ngOnInit() {
    this.getUserBorrowedBooks();
  }
}
