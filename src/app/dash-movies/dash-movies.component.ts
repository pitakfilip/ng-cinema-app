import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {MovieService} from "../movie.service";
import {Movie} from "../domain/movie";
import {Genre} from "../domain/genre";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dash-movies',
  templateUrl: './dash-movies.component.html',
  styles: [
  ]
})
export class DashMoviesComponent {

  allMovies : Movie[] | undefined;
  genres : Genre[] | undefined;
  movieEdit : Movie = {} as Movie;
  movieForm : FormGroup;
  upload : File | undefined;

  constructor(private userService : UserService,
              private movieService : MovieService) {
    this.loadData();

    this.movieForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required]),
      release: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required]),
      actors: new FormControl('', [Validators.required]),
      audio: new FormControl('', [Validators.required]),
      subtitles: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required])
    });

  }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }

  loadData() {
    this.movieService.getAllAdmin()
      .subscribe(val => {
        this.allMovies = val;
      });

    this.movieService.getGenres()
      .subscribe(val => {
        this.genres = val;
      });
  }

  calcAvg(num : number) {
    return num.toFixed(2);
  }

  deleteMovie(id : number, name : string){
    if(confirm(`Delete movie ${name}?`)){
      this.movieService.deleteId(id)
        .subscribe(() => {
          this.loadData();
        })
    }
  }

  editMovie(movie : Movie) {
    this.movieEdit = movie;
  }

  handleFileInput(files: FileList) {
    // @ts-ignore
    this.upload = files.item(0);
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.upload = event.target.files[0]
  }

  saveChanges() {
    if (confirm('Save changes?')) {
      this.movieService.updateMovie(this.movieEdit)
        .subscribe(() => {
          this.loadData();
        });
      //@ts-ignore
      document.getElementById('done_edit').click();
    }
  }

  confirmChanges() {}
}
