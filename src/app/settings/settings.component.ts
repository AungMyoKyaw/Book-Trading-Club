import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [UserService]
})
export class SettingsComponent implements OnInit {
  userInfo:any ={username:'Name',city:'City',state:'State'}

  constructor(private userService:UserService,private appComponent:AppComponent,private router:Router) { }

  getUserInfo(){
    this.userService.getUserInfo()
        .subscribe(result=>{
          Object.keys(result).forEach(key=>{
            this.userInfo[key] = result[key]
          })
        },
        error=>{
          if(error.status == 401){
            this.appComponent.changeToAuth(false);
            this.router.navigateByUrl('login');
            this.userService.openSnackBar('Pls Login Again !')
          }
          this.userService.openSnackBar('Error on getting user data. Pls Login Again');
        })
  }

  updateUserInfo(value){
    this.userService.updateUserInfo(value)
      .subscribe(result=>{
        Object.keys(result).forEach(key=>{
          this.userInfo[key] = result[key]
        });
        this.userService.openSnackBar('Successfully updated user profile');
      },
      error=>{
        if(error.status == 401){
          this.appComponent.changeToAuth(false);
          this.router.navigateByUrl('login');
          this.userService.openSnackBar('Pls Login Again !')
        }
        this.userService.openSnackBar('Error on updating userprofile');
      })
  }

  ngOnInit() {
    this.getUserInfo();
  }

}
