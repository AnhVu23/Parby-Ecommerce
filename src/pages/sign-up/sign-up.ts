import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage implements OnInit{
  signUpForm: FormGroup;
  userName = '';
  password = '';
  repeatedPassword = '';
  email = '';
  fullName = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      'userName': new FormControl(this.userName, Validators.required),
      'password': new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      'repeatedPassword': new FormControl(this.repeatedPassword, [Validators.required, Validators.minLength(8)]),
      'email': new FormControl(this.email, [Validators.email, Validators.required]),
      'fullName': new FormControl(this.fullName)
    });
  }
  onSignUp() {
    if(this.repeatedPassword !== this.password) {
      console.log(this.signUpForm.invalid);
    }
    if(this.signUpForm.valid) {
      if(this.auth.checkUserNameIfExist(this.userName)) {
        if(this.fullName !== '') {
          this.auth.signUp(this.userName, this.password, this.email, this.fullName);
        } else {
          this.auth.signUp(this.userName, this.password, this.email);
        }
      }
    }

  }

}
