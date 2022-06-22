import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movie} from "./domain/movie";
import {Genre} from "./domain/genre";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http : HttpClient) { }

  getById(id : number) {
    return this.http.get<Movie>(`/api/movies/${id}`);
  }

  getAll() {
    return this.http.get<Movie[]>('/api/movies?admin=false');
  }

  getAllAdmin() {
    return this.http.get<Movie[]>('/api/movies?admin=true');
  }

  getHottest() {
    return this.http.get<Movie[]>('/api/movies/hottest');
  }

  getActive() {
    return this.http.get<Movie[]>('/api/movies/active');
  }

  getComingSoon() {
    return this.http.get<Movie[]>('/api/movies/soon');
  }

  getAllGenre(id : number) {
    return this.http.get<Movie[]>(`/api/movies/genre/${id}`);
  }

  getGenres() {
    return this.http.get<Genre[]>('/api/genres');
  }

  deleteId(id : number) {
    return this.http.delete<void>(`/api/movies/${id}`);
  }

  updateMovie(mov : Movie) {
    return this.http.put<void>(`/api/movies/${mov.id}`, mov);
  }
}
