import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: 'rating.html'
})
export class RatingComponent {
  isClicked: Array<boolean> = [false,false,false,false,false];
  range: Array<number> = [1,2,3,4,5];
  @Input('rate') rate: number;
  @Output('checkedChange') change = new EventEmitter<number>();
  constructor() {

  }

  onRating(value) {
    this.rate = value + 1;
    for(let i = 0; i <= value; i++) {
      this.isClicked[i] = true;
    }
    this.change.emit(this.rate);
  }

  onUpdateRating(value) {
    this.rate = value + 1;
    if(value <= 4) {
      for(let i = value + 1; i < this.isClicked.length; i++) {
        this.isClicked[i] = false;
      }
    }
    this.change.emit(this.rate);
  }
}
