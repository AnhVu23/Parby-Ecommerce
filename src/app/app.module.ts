import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {SignUpPage} from "../pages/sign-up/sign-up";
import {SignInPage} from "../pages/sign-in/sign-in";
import {AuthService} from "../services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
import {SearchPage} from "../pages/search/search";
import {CartListPage} from "../pages/cart-list/cart-list";
import {CollectionsPage} from "../pages/collections/collections";
import {ProductsPage} from "../pages/products/products";
import {WishListPage} from "../pages/wish-list/wish-list";
import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {ProductService} from "../services/product.service";
import {CartService} from "../services/cart.service";
import {ReviewPage} from "../pages/review/review";

@NgModule({
  declarations: [
    MyApp,
    SignUpPage,
    SignInPage,
    HomePage,
    TabsPage,
    SearchPage,
    CartListPage,
    CollectionsPage,
    WishListPage,
    ProfilePage,
    SettingsPage,
    ProductsPage,
    ReviewPage
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
    HomePage,
    TabsPage,
    SearchPage,
    CartListPage,
    CollectionsPage,
    ProductsPage,
    WishListPage,
    ProfilePage,
    SettingsPage,
    ReviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ProductService,
    CartService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
