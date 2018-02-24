
import {Injectable} from "@angular/core";
import {Product} from "../model/product.model";

@Injectable()
export class CartService {
  productsArray: Product[] = [];
  constructor() {}

  addProduct(imagePath: string, name: string, price: string, size: string, color: string, quantity: string) {
    this.productsArray.push(new Product(imagePath, name, price, size, color, quantity));
  }
}
