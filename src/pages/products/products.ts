import {Component, OnInit, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {MediaService} from "../../services/media";
import {CartListPage} from "../cart-list/cart-list";

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
  productName: string;
  productColor: string;
  productSize: string;
  productQuantity: number;
  @ViewChild('productSlides') productSlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private mediaService: MediaService) {
  }

  ngOnInit() {
    this.productName = 'Diaper Changing Pad';
    this.mediaService.getImageByTag(this.tag).subscribe(
      response => {
        console.log(response);
        this.productsArray = response;
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
    this.navCtrl.push(this.cartListPage);
  }
}
