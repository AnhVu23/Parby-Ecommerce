import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductService} from "../../services/product.service";
import {ProductShowModel} from "../../model/product-show.model";
import {WishListService} from "../../services/wish-list.service";
import {ProductsPage} from "../products/products";
import {SearchPage} from "../search/search";

/**
 * Generated class for the CollectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html',
})
export class CollectionsPage implements OnInit{
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads';
  searchInput: string;
  pageName: string;
  tag: string;
  ready = false;
  productPage = ProductsPage;
  productArray: ProductShowModel[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private productService: ProductService, private wishListService: WishListService) {
  }

  ngOnInit() {
    this.setTitle();
    this.onGetProduct();
  }


  setTitle() {
    this.pageName = this.navParams.get('title');
  }

  onGetProduct() {
    this.tag = this.navParams.get('tag');
    console.log(this.tag);
    this.productService.getImageByTag(this.tag).subscribe(
      response => {
        console.log(response);
        const temp: any = response;
        for(let element of temp) {
          const imagePath = this.uploadUrl + '/' + element['filename'];
          const price = +element['title'];
          const name = element['description'];
          const tag = this.productService.renameTag(this.tag, name);
          this.productArray.push(new ProductShowModel(name, imagePath, price, tag, false));
        }
        this.ready = true;
      }
    );
  }

  onChangeWishList(event: any, index: number) {
    event.stopPropagation();
      this.productArray[index].isLiked = true;
      if(this.productArray[index].isLiked) {
        this.wishListService.addToWishList(this.productArray[index].name, this.productArray[index].imagePath, this.productArray[index].price, this.productArray[index].tag);
      } else {
        this.wishListService.removeFromWishList(this.productArray[index].name);
      }
  }

  onNagivateToProduct(product: ProductShowModel) {
    this.navCtrl.push(this.productPage, {
      product: product
    } )
  }

  onInput(event: any) {
    this.navCtrl.push(SearchPage);
  }
}
