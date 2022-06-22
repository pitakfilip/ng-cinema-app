import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rating} from "./domain/rating";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get<Rating>(`/api/ratings`);
  }

  getByUserId(id : number) {
    return this.http.get<Rating>(`/api/ratings`); //TODO
  }

  getByMovieId(id : number) {
    return this.http.get<Rating>(`/api/ratings/movie/${id}`);

  }
}
