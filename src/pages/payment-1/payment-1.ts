import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {Payment_2Page} from "../payment-2/payment-2";

/**
 * Generated class for the Payment_1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-1',
  templateUrl: 'payment-1.html',
})
export class Payment_1Page {
  payment2Page = Payment_2Page;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onNext(form: NgForm) {
    const totalCost = this.navParams.get('cost');
    this.navCtrl.push(this.payment2Page, {
      'email': form.value.email,
      'cost': totalCost
    });
  }
}
