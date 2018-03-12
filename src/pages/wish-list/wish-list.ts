import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WishListService} from "../../services/wish-list.service";
import {ProductShowModel} from "../../model/product-show.model";
import {ProductsPage} from "../products/products";

/**
 * Generated class for the WishListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wish-list',
  templateUrl: 'wish-list.html',
})
export class WishListPage {
  isLiked = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private wishListService: WishListService) {
  }

  onChangeWishList(event: any, i: number) {
    event.stopPropagation();
    this.wishListService.wishListArray.splice(i, 1);
  }

  onNavigateToProduct(product: ProductShowModel) {
    const tag = product.tag
    const collectionTag = this.wishListService.getCollectionTag(tag);
    this.navCtrl.push(ProductsPage, {
      product: product,
      tag: collectionTag
    })
  }
}
