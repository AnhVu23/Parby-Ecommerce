import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductShowModel} from "../../model/product-show.model";
import {ProductService} from "../../services/product.service";
import {map} from "rxjs/operators";
import {WishListService} from "../../services/wish-list.service";
import {CollectionsPage} from "../collections/collections";
import {ProductsPage} from "../products/products";
import {SearchPage} from "../search/search";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads';
  productPage = ProductsPage;
  collectionPage = CollectionsPage;

  searchInput: string;
  babyProduct: ProductShowModel[] = [];
  babyTag = 'parby-e baby';
  girlProduct: ProductShowModel[] = [];
  girlTag = 'parby-e girl';
  boyProduct: ProductShowModel[] = [];
  boyTag = 'parby-e boy';
  babyReady = false;
  girlReady = false;
  boyReady = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private productService: ProductService, private wishListService: WishListService) {
  }

  ngOnInit() {
   this.onGetBabyProduct();
   this.onGetBoyProduct();
   this.onGetGirlProduct();
  }

  onGetBabyProduct() {
    this.productService.getImageByTag(this.babyTag).subscribe(
      response => {
        console.log(response);
        const temp: any = response;
        for(let element of temp) {
          const imagePath = this.uploadUrl + '/' + element['filename'];
          const price = +element['title'];
          const name = element['description'];
          const tag = this.productService.renameTag(this.babyTag, name);
          this.babyProduct.push(new ProductShowModel(name, imagePath, price, tag, false));
        }
        this.babyReady = true;
      }
    );
  }

  onGetBoyProduct() {
    this.productService.getImageByTag(this.boyTag).subscribe(
      response => {
        console.log(response);
        const temp: any = response;
        for(let element of temp) {
          const imagePath = this.uploadUrl + '/' + element['filename'];
          const price = +element['title'];
          const name = element['description'];
          const tag = this.productService.renameTag(this.boyTag, name);
          this.boyProduct.push(new ProductShowModel(name, imagePath, price, tag, false));
        }
        this.boyReady = true;
      }
    );
  }

  onGetGirlProduct() {
    this.productService.getImageByTag(this.girlTag).subscribe(
      response => {
        console.log(response);
        const temp: any = response;
        for(let element of temp) {
          const imagePath = this.uploadUrl + '/' + element['filename'];
          const price = +element['title'];
          const name = element['description'];
          const tag = this.productService.renameTag(this.girlTag, name);
          this.girlProduct.push(new ProductShowModel(name, imagePath, price, tag, false));
        }
        this.girlReady = true;
      }
    );
  }

  onChangeWishList(event: any, index: number, tag: string) {
    event.stopPropagation();
    if (tag === this.babyTag) {
      this.babyProduct[index].isLiked = true;
      if(this.babyProduct[index].isLiked) {
        this.wishListService.addToWishList(this.babyProduct[index].name, this.babyProduct[index].imagePath, this.babyProduct[index].price, this.babyProduct[index].tag);
      } else {
        this.wishListService.removeFromWishList(this.babyProduct[index].name);
      }
    } else if (tag === this.girlTag) {
      this.girlProduct[index].isLiked = true;
      if (this.girlProduct[index].isLiked) {
        this.wishListService.addToWishList(this.girlProduct[index].name, this.girlProduct[index].imagePath, this.girlProduct[index].price, this.girlProduct[index].tag);
      } else {
        this.wishListService.removeFromWishList(this.girlProduct[index].name);
      }
    } else if (tag === this.boyTag) {
      this.boyProduct[index].isLiked = true;
      if (this.boyProduct[index].isLiked) {
        this.wishListService.addToWishList(this.boyProduct[index].name, this.boyProduct[index].imagePath, this.boyProduct[index].price, this.boyProduct[index].tag);
      } else {
        this.wishListService.removeFromWishList(this.boyProduct[index].name);
      }
    }
  }

  onNagivateToCollection(tag: string) {
    if(tag === this.babyTag) {
      this.navCtrl.push(this.collectionPage, {
        title: 'Baby',
        tag: tag
      });
    } else if(tag === this.girlTag) {
      this.navCtrl.push(this.collectionPage, {
        title: 'Girl',
        tag: tag
      });
    } else if(tag === this.boyTag) {
      this.navCtrl.push(this.collectionPage, {
        title: 'Boy',
        tag: tag
      });
    }
  }

  onNagivateToProduct(product: ProductShowModel) {
    this.navCtrl.push(this.productPage, {
      product: product
    })
  }

  onInput(event: any) {
    this.navCtrl.push(SearchPage);
  }
}
