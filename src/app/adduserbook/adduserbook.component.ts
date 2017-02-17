import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import {UserbookService} from '../userbook.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-adduserbook',
  templateUrl: './adduserbook.component.html',
  styleUrls: ['./adduserbook.component.css'],
  providers:[UserbookService]
})
export class AdduserbookComponent implements OnInit{
  searchText:string;
  books:[any];
  cols:number = 6;
  loading:boolean = true;
  error:boolean = false;
  isfound:boolean = true;

  constructor(public dialogRef:MdDialogRef<any>,private userBookService:UserbookService,private router:Router){}

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

  ngOnInit(){
    this.searchBook();
  }
}
