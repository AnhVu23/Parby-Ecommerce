import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WishListPage} from "../wish-list/wish-list";
import {HomePage} from "../home/home";
import {SearchPage} from "../search/search";
import {CartListPage} from "../cart-list/cart-list";
import {CollectionsPage} from "../collections/collections";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = CollectionsPage;
  tab3Root = SearchPage;
  tab4Root = WishListPage;
  tab5Root = CartListPage;
}
