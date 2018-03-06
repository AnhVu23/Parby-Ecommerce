import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductShowModel} from "../../model/product-show.model";
import {ProductService} from "../../services/product.service";
import {map} from "rxjs/operators";
import {WishListService} from "../../services/wish-list.service";
import {CollectionsPage} from "../collections/collections";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit{
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads';

  searchInput: string;
  babyProduct: ProductShowModel[] = [];
  babyTag = 'parby baby';
  girlProduct: ProductShowModel[] = [];
  girlTag = 'parby girl';
  boyProduct: ProductShowModel[] = [];
  boyTag = 'parby boy';
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
          const tag = this.babyTag + ' ' + name;
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
          const tag = this.babyTag + ' ' + name;
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
          const tag = this.babyTag + ' ' + name;
          this.girlProduct.push(new ProductShowModel(name, imagePath, price, tag, false));
        }
        this.girlReady = true;
      }
    );
  }

  onChangeWishList(index: number, tag: string) {
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

  onNagivateToCollection(collection: string) {
    this.navCtrl.push(CollectionsPage);
  }
}
