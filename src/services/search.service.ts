import {Injectable} from "@angular/core";

@Injectable()
export class SearchService {
  searchResultArray = [
    {title: 'Diaper Changing Pad',
    category: 'baby'},
    {title: 'Whale Pijama',
    category: 'baby'},
    {title: 'Nike White Shoes',
    category: 'baby'},
    {title: 'Adidas Black Sportwear',
      category: 'boy'},
    {title: 'Elephant Pijama',
      category: 'boy'},
    {title: 'Anchor Pijama Collection',
      category: 'boy'},
    {title: 'Dream T Shirt',
      category: 'boy'},
    {title: 'Adidas Colorful Sportwear',
      category: 'girl'},
    {title: 'Rabbit Dress',
      category: 'girl'},
    {title: 'Love Pijama',
      category: 'girl'},
    {title: 'Nike Pink Shoes',
      category: 'girl'},
    {title: 'Love Dad Pijama',
      category: 'girl'}
    ];

  constructor() {}

  filterItems(searchTerm){
    return this.searchResultArray.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
