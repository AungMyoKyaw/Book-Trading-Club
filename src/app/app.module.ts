import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { UserbooksComponent } from './userbooks/userbooks.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { AdduserbookComponent } from './adduserbook/adduserbook.component';
import { BookrequesterComponent } from './bookrequester/bookrequester.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { BorrowedBooksComponent } from './borrowed-books/borrowed-books.component';
import { TradeRequestsComponent } from './trade-requests/trade-requests.component';
import { MyTradeRequestsComponent } from './my-trade-requests/my-trade-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    BooksComponent,
    UserbooksComponent,
    SettingsComponent,
    HomeComponent,
    AdduserbookComponent,
    BookrequesterComponent,
    MybooksComponent,
    BorrowedBooksComponent,
    TradeRequestsComponent,
    MyTradeRequestsComponent
  ],
  entryComponents:[AdduserbookComponent,BookrequesterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    RouterModule.forRoot([
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },
      {
        path:'home',
        component:HomeComponent
      },
      {
        path:'signup',
        component:SignupComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'books',
        component:BooksComponent
      },
      {
        path:'userbooks',
        component:UserbooksComponent
      },
      {
        path:'settings',
        component:SettingsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
