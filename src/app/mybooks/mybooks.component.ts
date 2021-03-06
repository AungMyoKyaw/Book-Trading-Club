import { Component, OnInit } from '@angular/core';
import { UserbookService } from '../userbook.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css'],
  providers: [UserbookService,UserService]
})
export class MybooksComponent implements OnInit {
  books = [];
  cols:number = 6;
  more:boolean = false;
  loading:boolean = true;
  limit:number = 20;
  offset:number = 0;
  removing:boolean = false;
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

  getUserBooks(){
    this.setCols();
    this.userBookService.getUserBooks(this.limit,this.offset)
      .subscribe(books=>{
        books.userbooks.length ? this.nobook = false : this.nobook = true;
        this.loading = false;
        this.offset = books.currentPage * this.limit;
        this.books = this.books.concat(books.userbooks);
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

  removeUserBook(userBookId:string){
    this.removing = true;
    this.userBookService.deleteUserBook(userBookId)
      .subscribe(success=>{
        this.removing = false;
        this.reloading();
      },
      error=>{
        this.removing = false;
        this.userService.openSnackBar('Error on removing userbook');
      })
  }

  reloading(){
    this.loading = true;
    this.offset = 0;
    this.books = [];
    this.getUserBooks();
  }

  loadMore(){
    this.loading = true;
    this.getUserBooks();
  }

  ngOnInit() {
    this.getUserBooks();
  }

}
