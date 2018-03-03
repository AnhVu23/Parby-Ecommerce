import {Component, OnInit} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductsPage} from "../products/products";
import {ReviewService} from "../../services/review";
import {NgForm} from "@angular/forms";

/**
 * Generated class for the ReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage implements OnInit {
  rate = 0;
  commentContent: string;
  userName: string;
  tag: string;
  productName: string;
  file: File;
  fileId: number = null;
  productsPage = ProductsPage;

  constructor(private navCtrl: NavController, private auth: AuthService,
              private navParams: NavParams, private reviewService: ReviewService,
              private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.userName = this.auth.userName;
    this.tag = this.navParams.get('tag');
    this.productName = this.navParams.get('productName');
  }

  setFile(evt: any) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  onRateChange(currentRate: number) {
    this.rate = currentRate;
  }

  onUploadPhoto() {
    this.reviewService.onUploadPhoto(this.file, this.productName).subscribe(
      (data: any) => {
        console.log(data);
        this.fileId = +data['file_id'];
        console.log(this.fileId);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        alert('Upload Photo failed');
      }
    );
  }

  onPostReview(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Posting Review ...'
    });
    this.onUploadPhoto();
    setTimeout(() => {
      this.reviewService.onPostComment(this.fileId, form.value.commentContent).subscribe(
        data => {
          console.log(data);
        }, err => {
          console.log(err);
          alert('Upload comment failed');
        });
      this.reviewService.onPostRate(this.fileId, this.rate).subscribe(
        data => {
          console.log(data);
        }, err => {
          console.log(err);
          alert('Upload rate failed');
        });
      this.reviewService.onPostTag(this.fileId, this.tag).subscribe(
        data => {
          loading.dismiss();
          alert('Review was posted');
          this.navCtrl.setRoot(this.productsPage);
          console.log(data);
        }, err => {
          console.log(err);
          alert('Upload tag failed');
        });
    }, 2000);
  }
}
