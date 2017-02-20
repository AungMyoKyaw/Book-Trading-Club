import { Component, OnInit } from '@angular/core';
import {UserbookService} from '../userbook.service';
import { UserService } from '../user.service';
import { MdDialog,MdDialogRef } from '@angular/material';
import { BookrequesterComponent } from '../bookrequester/bookrequester.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers:[UserbookService]
})
export class BooksComponent implements OnInit {
  books = [];
  cols:number = 6;
  more:boolean = false;
  loading:boolean = true;
  limit:number = 20;
  offset:number = 0;

  dialogRef:MdDialogRef<any>;
  constructor(private userBookService:UserbookService,private userService:UserService,public dialog:MdDialog) { }

  setCols(){
    if(window.innerWidth <= 480){
      this.cols = 2;
    } else if(window.innerWidth>480 && window.innerWidth<960) {
      this.cols = 3;
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

  requestBook(bookId:string){
    this.dialogRef = this.dialog.open(BookrequesterComponent,{
      width:'40%'
    });
    this.dialogRef.componentInstance.bookId = bookId;
  }

  ngOnInit() {
    this.getAllBook();
  }

}
