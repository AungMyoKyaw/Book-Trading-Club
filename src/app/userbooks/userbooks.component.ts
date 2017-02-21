import { Component, OnInit ,Optional} from '@angular/core';
import { MdDialog,MdDialogRef } from '@angular/material';
import { UserbookService } from '../userbook.service';
import { UserService } from '../user.service';
import { AdduserbookComponent } from '../adduserbook/adduserbook.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userbooks',
  templateUrl: './userbooks.component.html',
  styleUrls: ['./userbooks.component.css'],
  providers:[UserbookService,UserService]
})
export class UserbooksComponent implements OnInit {
  dialogRef:MdDialogRef<AdduserbookComponent>;
  constructor(
    private userBookService:UserbookService,
    public dialog:MdDialog,
    private router:Router,
    private userService:UserService) { }

  checkAuth(){
    this.userService.isAuth()
      .subscribe(result=>{

      },
      error=>{
        this.router.navigateByUrl('home');
      })
  }

  ngOnInit() {
    this.checkAuth();
  }

  adduserbook(title:string){
    if(title!==''){
      this.dialogRef = this.dialog.open(AdduserbookComponent,{
        width:'80%'
      });
      this.dialogRef.componentInstance.searchText = title;
      this.dialogRef.afterClosed().subscribe(result=>{
        this.router.navigateByUrl('/home',{ skipLocationChange: true })
          .then(()=>{
            this.router.navigateByUrl('userbooks')
              .then(()=>{
                window.location.reload(true);
              });
        })
      });
    }
  }
}

