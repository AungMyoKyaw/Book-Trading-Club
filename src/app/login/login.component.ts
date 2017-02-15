import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private appComponent:AppComponent,private userService:UserService) { }

  ngOnInit() {
  }

  login(value){
    this.userService.login(value)
      .subscribe(result=>{
        this.userService.openSnackBar('Successfully Login !')
        this.router.navigateByUrl('books');
        this.appComponent.changeToAuth(true);
      },
      error=>{
        console.log(error);
        this.userService.openSnackBar(`${error.statusText}. Pls Try Again`)
        this.appComponent.changeToAuth(false);
      });
  }
}
