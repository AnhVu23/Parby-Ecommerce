
import {Injectable} from "@angular/core";
import {Product} from "../model/product.model";

@Injectable()
export class CartService {
  productsArray: Product[] = [];
  priceSum = 0;
  constructor() {}

  addProduct(imagePath: string, name: string, price: number, size: string, color: string, quantity: number) {
    this.productsArray.push(new Product(imagePath, name, price, size, color, quantity));
  }

  calculatePrice() {
    for(let product of this.productsArray) {
      this.priceSum += product.price;
    }
    return this.priceSum;
  }
}
