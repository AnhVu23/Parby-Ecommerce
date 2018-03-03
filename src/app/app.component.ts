import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {SignInPage} from "../pages/sign-in/sign-in";
import {AuthService} from "../services/auth.service";
import {TabsPage} from "../pages/tabs/tabs";
import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {ProductsPage} from "../pages/products/products";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SignInPage;
  signUpPage = SignUpPage;
  tabsPage = TabsPage;
  profilePage = ProfilePage;
  settingsPage = SettingsPage;
  productsPage = ProductsPage;
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
        this.auth.getCurrentUserName();
        this.auth.authenticated = true;
        this.rootPage = TabsPage;
      },
      err => {
        console.log(err);
        this.auth.authenticated = false;
        this.rootPage = SignInPage;
      }
    );
  }

  onSignOut() {
    this.auth.signOut();
    this.menuCtrl.close();
    this.auth.authenticated = false;
    this.rootPage = SignInPage;
  }
}

