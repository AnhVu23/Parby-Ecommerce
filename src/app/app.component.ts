import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {SignInPage} from "../pages/sign-in/sign-in";
import {HomePage} from "../pages/home/home";
import {AuthService} from "../services/auth";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = SignInPage;
  signUpPage = SignUpPage;
  homePage = HomePage;
  authenticated = false;
  @ViewChild('nav') nav: NavController;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
              private menuCtrl: MenuController, private auth: AuthService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
   this.isAuthenticated();
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

 isAuthenticated() {
    return this.auth.isAuthenticated().subscribe(
      response => {
        console.log(response);
        this.authenticated = true;
        this.nav.setRoot(this.homePage);
      },
      err => {
        console.log(err);
        this.authenticated = false;
        this.nav.setRoot(this.rootPage);
      }
    );
  }

  onSignOut() {
    this.auth.signOut();
    this.menuCtrl.close();
    this.authenticated = false;
    this.nav.setRoot(this.rootPage);
  }
}

