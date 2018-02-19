import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WishListPage} from "../wish-list/wish-list";
import {HomePage} from "../home/home";
import {SearchPage} from "../search/search";
import {CartListPage} from "../cart-list/cart-list";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homePage = HomePage;
  searchPage = SearchPage;
  wishListPage = WishListPage;
  cartListPage = CartListPage;
}
