import {Injectable} from "@angular/core";

@Injectable()
export class SearchService {
  searchResultArray = [
    {title: 'Diaper Changing Pad' },
    {title: 'Whale Pijama'},
    {title: 'Nike White Shoes'},
    {title: 'Adidas Black Sportwear'},
    {title: 'Elephant Pijama'},
    {title: 'Anchor Pijama Collection'},
    {title: 'Dream T Shirt'},
    {title: 'Adidas Colorful Sportwear'},
    {title: 'Rabbit Dress'},
    {title: 'Love Pijama'},
    {title: 'Nike Pink Shoes'},
    {title: 'Love Dad Pijama'}
    ];

  constructor() {}

  filterItems(searchTerm){
    return this.searchResultArray.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
