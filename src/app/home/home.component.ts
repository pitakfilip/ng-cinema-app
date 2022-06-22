import { Component, OnInit } from '@angular/core';
import {Movie} from "../domain/movie";
import {MovieService} from "../movie.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  carousel : Movie[] | undefined;
  soon : Movie[] | undefined;

  constructor(private moviesService : MovieService) {
    this.reloadCarousel();
    this.reloadSoon();
  }

  reloadCarousel() {
    this.moviesService.getHottest()
      .subscribe(val => {
        this.carousel = val;
      });
  }

  reloadSoon() {
    this.moviesService.getComingSoon()
      .subscribe(val => {
        this.soon  = val;
      });
  }

}
