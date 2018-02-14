import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {NgForm} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  }

  onSignUp(form: NgForm) {
    const userName = form.value.userName;
    const password = form.value.password;
    const email = form.value.email;
    const fullName = form.value.fullName;
    console.log(userName + 'cc');
      //if(this.auth.checkUserNameIfExist(userName)) {
        if(fullName !== '') {
          this.auth.signUp(userName, password, email, fullName);
        } else {
          this.auth.signUp(userName, password, email);
        }

  }

}
