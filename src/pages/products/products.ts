import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {ProductService} from "../../services/product.service";
import {CartListPage} from "../cart-list/cart-list";
import {CartService} from "../../services/cart.service";
import {ReviewPage} from "../review/review";
import {Review} from "../../model/review.model";
import {AuthService} from "../../services/auth.service";

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage implements OnInit{
  cartListPage = CartListPage;
  tag = 'parby baby diaper_changing_pad';
  productsArray: any;
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads';

  productName : string;
  productPrice : string;
  productImagePath : string;
  productColor: string;
  productSize: string;
  productQuantity : string;
  description: string;
  segmentButton: string;

  reviewTag: string;
  reviewArray: Review[] = [];
  reviewUserName: string[] = [];
  reviewImagePath: string[] = [];
  reviewCommentContent: string[] = [];
  reviewRate: number[] = [];
  reviewPage = ReviewPage;
  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private productService: ProductService, private cartService: CartService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.onGetProduct();
    this.onGetReview();
    setTimeout(() => this.addReview(), 1000);
  }

  onPrevSlide() {
    this.productSlides.slidePrev();
  }

  onNextSlide() {
    this.productSlides.slideNext();
  }

  onAddToCart() {
    this.cartService.addProduct(this.productImagePath, this.productName, this.productPrice, this.productSize, this.productColor, this.productQuantity);
    this.navCtrl.push(this.cartListPage);
  }

  onSelectProductDetails() {
    this.segmentButton = 'productDetails';
  }

  onSelectDeliveryTime() {
    this.segmentButton = 'deliveryTime';
  }

  onWriteReview() {
    this.navCtrl.push(this.reviewPage, {
      'tag': this.reviewTag,
      'productName': this.productName
    });
  }

  onGetProduct() {
    this.segmentButton = 'productDetails';
    this.productName = 'Diaper Changing Pad';
    this.productService.getImageByTag(this.tag).subscribe(
      response => {
        console.log(response);
        this.productsArray = response;
        this.productImagePath = 'this.uploadUrl' + '/' + this.productsArray[0].filename;
        this.productPrice = this.productsArray[0].title;
        this.description = this.productsArray[0].description;
      },
      err => {
        console.log('Products Page: ' + err);
      }
    );
  }

  onGetReview() {
    this.reviewTag = this.tag + ' review';
    this.productService.getImageByTag(this.reviewTag).subscribe(
      response => {
        const temp: any = response;
        for(let element of temp) {
          const userId = +element['user_id'];
          this.auth.getUserName(userId).subscribe(
            response => {
              const userName = response['username'];
              this.reviewUserName.push(userName);
            }, err => {
              console.log(err);
            }
          );
          const fileId = element['file_id'];
          this.productService.getFileByFileId(fileId).subscribe(
            response => {
              const imagePath = 'this.uploadUrl' + '/' + response['filename'];
              this.reviewImagePath.push(imagePath);
            }, err => {
              console.log(err);
            }
          );
          this.productService.getCommentByFileId(fileId).subscribe(
            response => {
              const commentContent = response[0]['comment'];
              this.reviewCommentContent.push(commentContent);
            }, err => {
              console.log(err);
            }
          );
          this.productService.getRatingbyFileId(fileId).subscribe(
            response => {
              const rating = +response[0]['rating'];
              this.reviewRate.push(rating);
            }, err => {
              console.log(err);
            }
          );
        }
      }, err => {
        console.log(err);
      }
    );
  }

  addReview() {
    for(let i = 0; i < this.reviewUserName.length; i++) {
      this.reviewArray.push(new Review(this.reviewUserName[0], this.reviewRate[0],
        this.reviewCommentContent[0], this.reviewImagePath[0]));
    }
    console.log(this.reviewArray);
  }
}
