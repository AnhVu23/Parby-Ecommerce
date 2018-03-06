import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {ProductService} from "../../services/product.service";
import {CartListPage} from "../cart-list/cart-list";
import {CartService} from "../../services/cart.service";
import {ReviewPage} from "../review/review";
import {AuthService} from "../../services/auth.service";
import {Review} from "../../model/review.model";
import {WishListService} from "../../services/wish-list.service";


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage implements OnInit{
  tag = 'parby baby diaper_changing_pad';
  productsArray: any;
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads';

  productName : string = 'example';
  productPrice : number;
  productImagePath : string;
  productColor: string;
  productSize: string;
  productQuantity : number;
  description: string;
  segmentButton: string;

  reviewTag: string;
  reviewArray: Review[] = [];
  reviewUserName: string[] = [];
  reviewImagePath: string[] = [];
  reviewCommentContent: string[] = [];
  reviewRate: number[] = [];
  reviewPage = ReviewPage;

  overallRate = -1;
  roundedRate = -1;
  isLiked = false;
  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private productService: ProductService, private cartService: CartService,
              private auth: AuthService, private wishListService: WishListService) {
  }

  ngOnInit() {
    this.onGetProduct();
    this.onGetReview();
    setTimeout(() => this.addReview(), 2000);
  }

  onPrevSlide() {
    this.productSlides.slidePrev();
  }

  onNextSlide() {
    this.productSlides.slideNext();
  }

  onAddToCart() {
    this.cartService.addProduct(this.productImagePath, this.productName, this.productPrice * this.productQuantity, this.productSize, this.productColor, this.productQuantity);
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
    const product = this.navParams.get('product');
    //Main
    /*this.productName = product.name;
    this.productImagePath = product.imagePath;
    this.productPrice = product.price;
    this.segmentButton = 'productDetails';
    this.description = 'Diaper Changing Pad';*/
    this.productService.getImageByTag(this.tag).subscribe(
      response => {
        this.productsArray = response;
        //Should be removed
        this.productImagePath = this.uploadUrl + '/' + this.productsArray[0].filename;
        this.productPrice = +this.productsArray[0].title;
        this.productName = this.productsArray[0].description;
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
              const imagePath = this.uploadUrl + '/' + response['filename'];
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
    for(let i = 0; i < this.reviewRate.length; i++) {
      this.reviewArray.push(new Review(this.reviewUserName[i],
        this.reviewCommentContent[i], this.reviewImagePath[i], +this.reviewRate[i]));
    }
    this.overallRate = this.productService.calculateOverallRate(this.reviewRate);
    this.roundedRate = Math.floor(this.overallRate);
  }

  onChangeWishList() {
    this.isLiked = !this.isLiked;
    if(this.isLiked) {
      this.wishListService.addToWishList(this.productName, this.productImagePath, this.productPrice, this.tag);
    } else {
      this.wishListService.removeFromWishList(this.productName);
    }
  }
}
