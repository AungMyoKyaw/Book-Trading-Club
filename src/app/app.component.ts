import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'Book Trading Club';

  auth:boolean = false;

  constructor(private userService:UserService,private router:Router){}

  openMessage(message:string){

  }

  isAuth(){
    this.userService.isAuth()
      .subscribe(result=>{
        this.auth = true;
      },
      error=>{
        this.auth = false;
      });
  }

  changeToAuth(value:boolean){
    this.auth = value;
  }

  logout(){
    this.userService.logout()
                    .subscribe(result=>{
                      this.auth = false;
                      this.userService.openSnackBar('Successfully Logout')
                      this.router.navigateByUrl('home');
                    },
                    error=>{
                      this.userService.openSnackBar('Error on Logout :(');
                      this.auth = true;
                    })
  }

  ngOnInit(){
    this.isAuth();
  }
}
