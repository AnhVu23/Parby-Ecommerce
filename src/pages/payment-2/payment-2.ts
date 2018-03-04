import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ConfirmationPage} from "../confirmation/confirmation";

/**
 * Generated class for the Payment_2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-2',
  templateUrl: 'payment-2.html',
})
export class Payment_2Page {
  confirmationPage = ConfirmationPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onPay(form: NgForm) {
    const email = this.navParams.get('email');
    this.navCtrl.push(this.confirmationPage, {
      'email': email
    });
  }

}
