import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {SignInPage} from "../pages/sign-in/sign-in";
import {AuthService} from "../services/auth";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HomePage} from "../pages/home/home";

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    SignInPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignUpPage,
    SignInPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
