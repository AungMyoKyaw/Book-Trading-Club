import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { UserbookService } from '../userbook.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bookrequester',
  templateUrl: './bookrequester.component.html',
  styleUrls: ['./bookrequester.component.css'],
  providers:[UserbookService,UserService]
})
export class BookrequesterComponent implements OnInit {
  bookId:string;
  ownerList:[any];
  loading:boolean = false;
  requested:boolean = false;

  constructor(
    public dialogRef:MdDialogRef<any>,
    private userBookService:UserbookService,
    private userService:UserService) { }

  getOwnerList(){
    this.loading = true;
    this.userBookService.getOwner(this.bookId)
      .subscribe(owner=>{
        this.ownerList = owner;
        this.loading = false;
      },
      error=>{
        this.loading = false;
        this.userService.openSnackBar('Error Getting Owner List.Pls refresh browser');
      })
  }

  requestBook(ownerId:string){
    this.loading = true;
    this.userBookService.requestBook(ownerId,this.bookId)
      .subscribe(success=>{
        this.loading = false;
        this.requested = true;
        this.userService.openSnackBar('This book is successfully requested.')
      },
      error=>{
        this.userService.openSnackBar('Error on requesting user book pls refresh browser');
      })
  }

  ngOnInit() {
    this.getOwnerList();
  }

}
