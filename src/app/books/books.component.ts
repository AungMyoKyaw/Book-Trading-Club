import { Component, OnInit } from '@angular/core';
import {UserbookService} from '../userbook.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers:[UserbookService]
})
export class BooksComponent implements OnInit {
  books = [];
  cols:number = 8;
  more:boolean = false;
  loading:boolean = true;
  limit:number = 20;
  offset:number = 0;

  constructor(private userBookService:UserbookService,private userService:UserService) { }

  setCols(){
    if(window.innerWidth <= 480){
      this.cols = 3;
    } else if(window.innerWidth>480 && window.innerWidth<960) {
      this.cols = 4;
    } else {
      this.cols = 6;
    }
  }

  getAllBook(){
    this.setCols();
    this.userBookService.getAllBook(this.limit,this.offset)
      .subscribe(books=>{
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
    this.getAllBook();
  }

  ngOnInit() {
    this.getAllBook();
  }

}
