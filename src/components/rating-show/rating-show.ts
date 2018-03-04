import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rating-show',
  templateUrl: 'rating-show.html'
})
export class RatingShowComponent implements OnInit{

  isRated: Array<boolean> = [false,false,false,false,false];
  range: Array<number> = [1,2,3,4,5];
  @Input('rate') rate: number;
  constructor() {

  }

  ngOnInit() {
    for(let i = 0; i < this.rate; i++) {
      this.isRated[i] = true;
    }
  }



}
