import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage implements OnInit{
  email: string;
  homePage = HomePage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.email = this.navParams.get('email');
  }

  onBackToHome() {
    this.navCtrl.setRoot(this.homePage);
  }

}
