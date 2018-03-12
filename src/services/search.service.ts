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
    {title: 'Batman Pijamas',
      category: 'baby'},
    {title: 'Pyjama Suits',
      category: 'baby'},
    {title: 'Sweat Shirt Trousers',
      category: 'baby'},
    {title: 'Adidas Black Sportwear',
      category: 'boy'},
    {title: 'Elephant Pijama',
      category: 'boy'},
    {title: 'Anchor Pijama Collection',
      category: 'boy'},
    {title: 'Dream T Shirt',
      category: 'boy'},
    {title: 'Lego Hoodie',
      category: 'boy'},
    {title: 'Nyc Shirt',
      category: 'boy'},
    {title: 'T Rex T Shirt',
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
      category: 'girl'},
    {title: 'Cotton Sweat Shirt',
      category: 'girl'},
    {title: 'Denim Jacket',
      category: 'girl'},
    {title: ' Jersey Hair Band',
      category: 'girl'}
    ];

  constructor() {}

  filterItems(searchTerm){
    return this.searchResultArray.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}
