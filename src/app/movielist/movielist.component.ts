import { Component, ChangeDetectorRef } from '@angular/core';
import {Movie} from "../domain/movie";
import {MovieService} from "../movie.service";
import {Router, RouterModule} from "@angular/router";
import {Genre} from "../domain/genre";
import {max} from "rxjs";


@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styles: [
  ]
})
export class MovielistComponent{

  allMovies : Movie[] | undefined;
  soonMovies : Movie[] | undefined;
  genreMovies : Movie[] | undefined;
  genres : Genre[] | undefined;

  pageMovies : Movie[] | undefined;

  pageSize : number = 12;
  currentPage : number = 1;
  maxPage : number | undefined;
  hasNext = true;
  hasPrev = false;

  showAll = true;
  showSoon = false;
  showGenre = false;
  genreName = '';

  constructor(private moviesService : MovieService,
              private router : Router,
              private changeDetection : ChangeDetectorRef) {
    this.loadData();
  }

  loadData() {
    this.moviesService.getActive()
      .subscribe(val => {
        this.allMovies = val;
      });

    this.moviesService.getComingSoon()
      .subscribe(val => {
        this.soonMovies = val;
      });

    this.moviesService.getGenres()
      .subscribe(val => {
        this.genres = val;
      });
  }


  getPage() {
    if (this.showGenre) {
      // @ts-ignore
      this.maxPage = Math.ceil(this.genreMovies?.length / this.pageSize);
      this.hasNext = this.maxPage > 1;

      // @ts-ignore
      return this.genreMovies.slice(((this.currentPage-1) * this.pageSize), ((this.currentPage-1) * this.pageSize) + this.pageSize);
    }

    if (this.showSoon) {
      // @ts-ignore
      this.maxPage = Math.ceil(this.soonMovies?.length / this.pageSize);
      console.log(this.maxPage);

      this.hasNext = this.maxPage > 1;
      // @ts-ignore
      return this.soonMovies.slice(((this.currentPage-1) * this.pageSize), ((this.currentPage-1) * this.pageSize) + this.pageSize);

    }
    // @ts-ignore
    this.maxPage = Math.ceil(this.allMovies?.length / this.pageSize);
    this.hasNext = this.maxPage > 1;
    // @ts-ignore
    return this.allMovies.slice(((this.currentPage-1) * this.pageSize), ((this.currentPage-1) * this.pageSize) + this.pageSize);
  }

  prevPage() {
    if (1 < this.currentPage) {
      this.hasNext = true;
      --this.currentPage;
      this.changeDetection.detectChanges();
    }
    if (this.currentPage == 1)
      this.hasPrev = false;
  }

  nextPage() {
    // @ts-ignore
    if (this.currentPage < this.maxPage) {
      this.hasPrev = true;
      ++this.currentPage;
      this.changeDetection.detectChanges();
    }
    if (this.currentPage == this.maxPage)
      this.hasNext = false;

  }

  routeDetails(id : number) {
    this.router.navigate(['/movies', id]);
  }

  cancelFilter() {
    this.currentPage = 1;
    this.hasPrev = false;
    this.showAll = true;
    this.showSoon = false;
    this.showGenre = false;
  }

  showNew() {
    this.currentPage = 1;
    this.hasPrev = false;
    this.showAll = false;
    this.showSoon = true;
    this.showGenre = false;
  }

  filterGenre(id : number) {
    this.currentPage = 1;
    this.hasPrev = false;
    this.moviesService.getAllGenre(id)
      .subscribe(val => {
        this.genreMovies = val;
      });
    this.showAll = false;
    this.showSoon = false;
    this.showGenre = true;
  }
}
