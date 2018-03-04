
import {Injectable} from "@angular/core";
import {Product} from "../model/product.model";

@Injectable()
export class WishListService {
  wishListArray: Product[] = [];
  constructor() {
  }

  addToWishList(imagePath: string, name: string, price: number, size: string, color: string, quantity: number) {
    this.wishListArray.push(new Product(imagePath, name, price, size, color, quantity));
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
