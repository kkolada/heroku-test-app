import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit, OnChanges {

  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() range: number;
  @Input() disabled: boolean;


  ratingsArray: Star[];

  constructor() { }

  ngOnInit() {
    if (_.isUndefined(this.disabled)) {
      this.disabled = false;
    }
    if (_.isUndefined(this.rating)) {
      this.rating = 0;
    }
    if (_.isUndefined(this.range)) {
      this.range = 5;
    }
    this.ratingsArray = this.initArray(this.range);

    if (this.rating > 0) {
      this.initStars(this.rating);
    }
  }

  ngOnChanges(changes: any) {
    if (!_.isUndefined(changes.rating) && changes.rating.currentValue === 0) {
      this.clearStars();
    }
  }

  initArray(size) {
    let ratingsArray: Star[] = new Array(size);

    for (let i = 0; i < size; i++) {
      ratingsArray[i] = new Star(false, i+1);
    }

    return ratingsArray;
  }

  private changeSelection(star: Star, filled: boolean) {
    for (let i = this.rating; i < this.ratingsArray.length; i++) {
      if (star.starNumber >= this.ratingsArray[i].starNumber) {
        this.ratingsArray[i].filled = filled;
      } else {
        this.ratingsArray[i].filled = false;
      }
    }
  }

  private clearStars() {
    if (!_.isUndefined(this.ratingsArray)) {
      for (let i = 0; i < this.ratingsArray.length; i++) {
        this.ratingsArray[i].filled = false;
      }
    }
  }

  private initStars(selectedStars: number) {
    for (let i = 0; i < selectedStars; i++) {
      this.ratingsArray[i].filled = true;
    }
  }

  mouseEnter(star) {
    if (!this.disabled)
      this.changeSelection(star, true);
  }

  mouseLeave(star) {
    if (!this.disabled)
      this.changeSelection(star, false);
  }

  mouseClick(star) {
    if (!this.disabled) {
      this.rating = star.starNumber;
      this.changeSelection(star, false);
      this.ratingChange.emit(this.rating);
    }
  }

}

class Star {

  constructor(public filled: boolean, public starNumber: number) {

  }

}
