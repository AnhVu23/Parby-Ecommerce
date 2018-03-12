import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartService} from "../../services/cart.service";
import {Payment_1Page} from "../payment-1/payment-1";

/**
 * Generated class for the CartListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart-list',
  templateUrl: 'cart-list.html',
})
export class CartListPage implements OnInit{
  payment1Page = Payment_1Page
  numberOfItems: number;
  totalCost: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.onUpdate();
  }

  onCheckOut() {
    this.navCtrl.push(this.payment1Page, {
      'cost': this.totalCost
    });
  }

  onRemoveProduct(index: number) {
    this.cartService.removeProduct(index);
    this.onUpdate();
  }

  onUpdate() {
    this.numberOfItems = this.cartService.productsArray.length;
    this.totalCost = +this.cartService.calculatePrice().toFixed(2);
  }
}
