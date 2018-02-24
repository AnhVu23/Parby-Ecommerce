import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {ProductService} from "../../services/product.service";
import {CartListPage} from "../cart-list/cart-list";
import {CartService} from "../../services/cart.service";

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
  @ViewChild('productSlides') productSlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private productService: ProductService, private cartService: CartService) {
  }

  ngOnInit() {
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

  onWriteReview() {}
}
