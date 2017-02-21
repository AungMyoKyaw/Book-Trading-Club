import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import {UserbookService} from '../userbook.service';
import { UserService } from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adduserbook',
  templateUrl: './adduserbook.component.html',
  styleUrls: ['./adduserbook.component.css'],
  providers:[UserbookService,UserService]
})
export class AdduserbookComponent implements OnInit{
  searchText:string;
  books:[any]
  cols:number = 6;
  loading:boolean = true;
  addingBook:boolean = false;
  error:boolean = false;
  isfound:boolean = true;
  addedBook=[];

  constructor(
    public dialogRef:MdDialogRef<AdduserbookComponent>,
    private userBookService:UserbookService,
    private router:Router,
    private userService:UserService
    ){}

  setCols(){
    if(window.innerWidth<=480){
      this.cols = 2;
    } else if(window.innerWidth>480 && window.innerWidth<960){
      this.cols = 3;
    } else {
      this.cols = 6;
    }
  }

  searchBook(){
    this.setCols();
    this.error = false;
    this.isfound = true;
    this.userBookService.searchBook(this.searchText)
      .subscribe(books=>{
        this.loading = false;
        if(books.length){
          this.books = books;
        } else {
          this.isfound = false;
        }
      },
      error=>{
        this.loading = false;
        this.error = true;
        console.log(error);
      })
  }

  addBook(book:any){
    this.addingBook = true;
    this.userBookService.addBook(book)
      .subscribe(result=>{
        this.addingBook = false;
        this.addedBook.push(book.id);
        this.userService.openSnackBar('Successfully added.')
      },
      error=>{
        this.addingBook = false;
        this.userService.openSnackBar(error.message);
      })
  }

  ngOnInit(){
    this.searchBook();
  }
}
