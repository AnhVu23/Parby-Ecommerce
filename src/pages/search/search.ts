import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SearchService} from "../../services/search.service";
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import {ProductService} from "../../services/product.service";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage implements OnInit{
  searchInput = '';
  searchControl: FormControl;
  searchResult: any;
  searching = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private searchService: SearchService, public productService: ProductService) {
  }

  ngOnInit() {
    this.searchControl = new FormControl();
    this.setFilteredItem();
    this.searchControl.valueChanges.debounceTime(1000).subscribe(
      search => {
        this.searching = false;
        this.setFilteredItem();
      }
    );
  }

  onSearchInput() {
    this.searching = true;
  }

  setFilteredItem() {
    this.searchResult = this.searchService.filterItems(this.searchInput);
  }

  onGetResult(item: any) {
    console.log(item);
  }
}
