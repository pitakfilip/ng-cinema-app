import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MovieService} from "../movie.service";
import {Movie} from "../domain/movie";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RatingService} from "../rating.service";
import {Rating} from "../domain/rating";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styles: [
  ]
})
export class MoviedetailComponent {
  id : number | undefined;
  movie : Movie | any;
  recentRatings : Rating | any;

  constructor(private route:ActivatedRoute,
              private movieService : MovieService,
              private ratingService : RatingService,
              private sanitizer: DomSanitizer) {
    this.id = Number(route.snapshot.paramMap.get("id"));

    this.getMovie(this.id);
    this.getRatings(this.id);
  }

  round (val : number) {
    return val.toFixed(1);
  }

  pretifyDate (date : Date) {
    let pipe = new DatePipe('en-US');
    return pipe.transform(date, 'dd/MM/YYYY');
  }

  getMovie (id: number) {
    this.movieService.getById(id)
      .subscribe(val => {
      this.movie = val
    });
  }

  getRatings (id : number) {
    this.ratingService.getByMovieId(id)
      .subscribe(val => {
        this.recentRatings = val
      });
  }

  getURL() {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/GUMegkHvF_c');
  }
}
