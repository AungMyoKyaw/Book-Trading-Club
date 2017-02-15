import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  constructor(private userService:UserService,private appComponent:AppComponent,private router:Router) { }

  ngOnInit() {

  }

  signup(value){
    this.userService.signUp(value)
      .subscribe(result=>{
        this.appComponent.changeToAuth(true);
        this.userService.openSnackBar('User account is successfully created')
        this.router.navigateByUrl('books');
      },error=>{
        this.userService.openSnackBar('Error on creating user account!')
        this.appComponent.changeToAuth(false);
      });
  }
}
