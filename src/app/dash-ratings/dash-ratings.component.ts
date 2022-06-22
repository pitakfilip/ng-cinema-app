import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {RatingService} from "../rating.service";
import {Rating} from "../domain/rating";

@Component({
  selector: 'app-dash-ratings',
  templateUrl: './dash-ratings.component.html',
  styles: [
  ]
})
export class DashRatingsComponent {

  allRatings : Rating[] | undefined;

  constructor(private ratingService : RatingService,
              private userService : UserService) {
    this.loadData();
  }

  loadData() {
    this.ratingService.getAll()
      .subscribe(val => {
        //@ts-ignore
        this.allRatings = val;
      });
  }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }
}
