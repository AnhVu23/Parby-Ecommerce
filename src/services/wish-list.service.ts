
import {Injectable} from "@angular/core";
import {ProductShowModel} from "../model/product-show.model";

@Injectable()
export class WishListService {
  wishListArray: ProductShowModel[] = [];
  constructor() {
  }

  addToWishList(name: string, imagePath: string, price: number, tag: string) {
    this.wishListArray.push(new ProductShowModel(name, imagePath, price, tag, true));
  }

  removeFromWishList(productName: string) {
    for(let product of this.wishListArray) {
      if(productName === product.name) {
        const index = this.wishListArray.indexOf(product);
        this.wishListArray.splice(index, 1);
      }
    }
  }
}
