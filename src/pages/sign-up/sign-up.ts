import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {SignInPage} from "../sign-in/sign-in";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private auth: AuthService,
              private alertCtrl: AlertController) {
  }

  onSignUp(form: NgForm) {
    const userName = form.value.userName;
    const password = form.value.password;
    const email = form.value.email;
    const fullName = form.value.fullName;
    const loading = this.loadingCtrl.create({
      content: 'Signing you up ...'
    });
    loading.present();
      this.auth.signUp(userName, password, email, fullName).subscribe(
        response => {
          loading.dismiss();
          console.log(response);
          const alert = this.alertCtrl.create({
            title: 'Signup successed',
            message: response['message'],
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.push(SignInPage);
        },
        err => {
          loading.dismiss();
          console.log(err);
          const alert = this.alertCtrl.create({
            title: 'Signup failed',
            message: err.message,
            buttons: ['Ok']
          });
          alert.present();
        }
      );
  }
}
