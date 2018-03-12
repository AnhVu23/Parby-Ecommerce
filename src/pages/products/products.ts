import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, Slides} from 'ionic-angular';
import {ProductService} from "../../services/product.service";
import {CartListPage} from "../cart-list/cart-list";
import {CartService} from "../../services/cart.service";
import {ReviewPage} from "../review/review";
import {AuthService} from "../../services/auth.service";
import {Review} from "../../model/review.model";
import {WishListService} from "../../services/wish-list.service";
import {ProductShowModel} from "../../model/product-show.model";
import {HomePage} from "../home/home";


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage implements OnInit{
  tag = 'parby baby diaper_changing_pad';
  productsArray: any;
  relatedProductsArray: ProductShowModel[] = [];
  collectionTag: string;
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads';

  productName : string = 'example';
  productPrice : number;
  productImagePath : string;
  productQuantity = 1;
  productSize = 'M';
  productColor = 'white';
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
  isLiked: boolean;
  @ViewChild('productSlides') productSlides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private productService: ProductService, private cartService: CartService,
              private auth: AuthService, private wishListService: WishListService,
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.onGetProduct();
    this.onGetReview();
    this.onGetRelatedProduct();
    setTimeout(() => this.addReview(), 1000);
  }

  onPrevSlide() {
    this.productSlides.slidePrev();
  }

  onNextSlide() {
    this.productSlides.slideNext();
  }

  onAddToCart() {
    this.cartService.addProduct(this.productImagePath, this.productName, this.productPrice * this.productQuantity,
      this.productSize, this.productColor, this.productQuantity);
    const alert = this.alertCtrl.create({
      title: 'Add to cart successfully',
      buttons: [
        { text: 'Continue Shopping',
          handler: () => {
          this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'Check Out',
          handler: () => {
            this.navCtrl.push(CartListPage);
          }
        }
      ]
    });
    alert.present();
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
      'product': new ProductShowModel(this.productName, this.productImagePath, this.productPrice, this.tag, false)
    });
  }

  onGetProduct() {
    const product = this.navParams.get('product');
    this.productName = product.name;
    this.productImagePath = product.imagePath;
    this.productPrice = product.price;
    this.isLiked = product.isLiked;
    this.segmentButton = 'productDetails';
    this.description = 'Lorem Ipsum';
    this.tag = product.tag;
    this.productService.getImageByTag(this.tag).subscribe(
      response => {
        this.productsArray = response;
      },
      err => {
        console.log('Products Page: ' + err);
      }
    );
  }

  onGetReview() {
    const loading = this.loadingCtrl.create({
      content: 'Getting information ...'
    });
    loading.present();
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
        loading.dismiss();
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
    console.log(this.reviewImagePath);
    if(this.reviewRate.length > 0) {
      this.overallRate = this.productService.calculateOverallRate(this.reviewRate);
      this.roundedRate = Math.floor(this.overallRate);
    } else {
      this.overallRate = 0;
      this.roundedRate = 0;
    }
  }

  onChangeWishList() {
    this.isLiked = !this.isLiked;
    if(this.isLiked) {
      this.wishListService.addToWishList(this.productName, this.productImagePath, this.productPrice, this.tag);
    } else {
      this.wishListService.removeFromWishList(this.productName);
    }
  }

  onChangeWishListRelated(event: any, index: number) {
    event.stopPropagation();
    const product = this.relatedProductsArray[index];
    product.isLiked = !product.isLiked;
    if(product.isLiked) {
      this.wishListService.addToWishList(product.name, product.imagePath, product.price, product.tag);
    } else {
      this.wishListService.removeFromWishList(product.name);
    }
  }

  onGetRelatedProduct() {
    this.collectionTag = this.navParams.get('tag');
    console.log(this.collectionTag);
    this.productService.getImageByTag(this.collectionTag).subscribe(
      response => {
        const temp: any = response;
        const tempProductArray: ProductShowModel[] = [];
        for(let element of temp) {
          const imagePath = this.uploadUrl + '/' + element['filename'];
          const price = +element['title'];
          const name = element['description'];
          const tag = this.productService.renameTag(this.collectionTag, name);
          if(name !== this.productName) {
            tempProductArray.push(new ProductShowModel(name, imagePath, price, tag, false));
          }
        }
        const start = Math.floor(Math.random() * (tempProductArray.length - 1));
        this.relatedProductsArray = tempProductArray.slice(start, start + 2);
      }
    );
  }

  onNagivateToProduct(product: ProductShowModel) {
    this.navCtrl.push(ProductsPage, {
      product: product,
      tag: this.collectionTag
    })
  }
}
