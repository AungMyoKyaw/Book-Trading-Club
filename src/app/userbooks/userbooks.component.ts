import { Component, OnInit ,Optional} from '@angular/core';
import { MdDialog,MdDialogRef } from '@angular/material';
import { UserbookService } from '../userbook.service';
import { AdduserbookComponent } from '../adduserbook/adduserbook.component';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css'],
  providers:[UserbookService]
})
export class UserbooksComponent implements OnInit {
  dialogRef:MdDialogRef<any>;
  constructor(private userBookService:UserbookService,public dialog:MdDialog) { }

  ngOnInit() {
  }

  adduserbook(title:string){
    if(title!==''){
      this.dialogRef = this.dialog.open(AdduserbookComponent,{
        width:'80%'
      });
      this.dialogRef.componentInstance.searchText = title;
    }
  }
}
