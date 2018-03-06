import {Injectable} from "@angular/core";

@Injectable()
export class SearchService {
  searchResultArray = [
    {title: 'baby' },
    {title: 'girl'},
    {title: 'boy'},
    {title: 'diaper changing pad'},
    {title: 'body suit'},
    {title: 't shirt'},
    {title: 'shoe'},
    {title: 'dress'},
    {title: 'sporty clothes'}
    ];

  constructor() {}

  filterItems(searchTerm){
    return this.searchResultArray.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
}
