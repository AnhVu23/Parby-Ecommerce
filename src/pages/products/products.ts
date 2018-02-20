import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaService} from "../../services/media";

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
  tag = 'parby baby diaper_changing_pad';
  mediaArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private mediaService: MediaService) {
  }

  ngOnInit() {
    this.mediaService.getImageByTag(this.tag).subscribe(
      response => {
        console.log(response);
        this.mediaArray = response;
      }
    );
  }
}
