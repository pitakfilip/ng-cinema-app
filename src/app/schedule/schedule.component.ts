import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ScreeningService} from "../screening.service";
import {Screening} from "../domain/screening";
import {Movie} from "../domain/movie";
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styles: [
  ]
})
export class ScheduleComponent {

  date : Date | undefined;
  maxDate : Date | undefined;
  now : Date | undefined;
  screenings : Screening[] | any;
  // key : movie ID, val : screenings for given movie
  m : Map<number, Map<string, Screening[]>> | any;
  movies : Map<number, Movie> | any;
  empty = true;

  daySelected = 0;

  constructor(private screeningService : ScreeningService,
              private userService : UserService,
              private changeDetection : ChangeDetectorRef,
              private router : Router) {
    this.now = new Date(Date.now());
    this.date = new Date(this.now);
    this.maxDate = new Date(this.now);
    this.maxDate.setDate(this.maxDate.getDate() + 14);
    this.loadDay();
  }

  loadDay() {
    this.screenings = [];
    this.empty = true
    this.screeningService.getByDay(this.dateToString())
      .subscribe(val => {
        this.screenings = val
      });
  }

  dateToString() : string {
    //@ts-ignore
    return this.date?.toLocaleDateString().split('/').join('-');
  }

  pretifyTime(t : string) : string {
    return (t[0] == '0')? t.slice(1,-3) : t.slice(0, -3);
  }

  dayOffsetName(n : number) : string {
    let d = new Date(Date.now());
    d.setDate(d.getDate() + n);
    return d.toDateString().split(' ')[0];
  }

  dayClicked(n : number) {
    this.daySelected = n;
    // @ts-ignore
    this.date?.setDate(this.now?.getDate() + n);

    this.loadDay();
    this.changeDetection.markForCheck();
  }

  dateChange () {
    // @ts-ignore
    let val = document.getElementById('datePicker').value;
    let d = new Date(val);
    let now = new Date(Date.now());
    let offset = new Date();
    offset.setDate(now.getDate() + 13);

    if (offset < d || d < now){
      return;
    }

    this.date = new Date(val);
    const msInDay = 24 * 60 * 60 * 1000;

    let strNow = now.toLocaleDateString().split('/');
    let strDate = this.date.toLocaleDateString().split('/');
    if (strNow[0] == strDate[0] && strNow[1] == strDate[1] && strNow[2] == strDate[2])
      this.daySelected = 0;

    else
      this.daySelected =  Math.round(Math.abs(this.date.getTime() - now.getTime()) / msInDay) + 1;

    this.dayClicked(this.daySelected);
  }

  dateValue () {
    let d = this.date?.toLocaleDateString().split('/');
    // @ts-ignore
    return d[2] + '-' + ((d[0].length == 2)? d[0] : '0'+d[0])+ '-' +  d[1] ;
  }

  maxDateValue() {
    let d = this.maxDate?.toLocaleDateString().split('/');
    // @ts-ignore
    return d[2] + '-' + ((d[0].length == 2)? d[0] : '0'+d[0])+ '-' +  d[1];
  }

  mapScreenings() {
    this.m = new Map();
    this.movies = new Map();

    this.screenings = this.filter();

    this.screenings.forEach((s : Screening) => {
        if (!this.m.has(s.movie.id)){
          this.m.set(s.movie.id, new Map());
          this.movies.set(s.movie.id, s.movie);
        }

        if (! this.m.get(s.movie.id).has(s.hall.type)){
          this.m.get(s.movie.id).set(s.hall.type, []);
        }
      this.empty = false;
      this.m.get(s.movie.id).get(s.hall.type).push(s);
      });

    return this.m;
  }

  filter() {
    let cur = new Date();
    cur.setMinutes(cur.getMinutes() + 30);

    return this.screenings.filter((s : Screening) => {
      let time = s.time.toLocaleString().split(":");
      let show = new Date(s.day);
      show.setHours(Number(time[0]));
      show.setMinutes(Number(time[1]));
      return cur < show;
    });
  }

  sortScreenings (s : Screening[]) {
    // @ts-ignore
    return s.sort((a, b) => {
      return a.time < b.time ? -1 : 1;
    });
  }

  makeReservation (s : Screening){
    console.log("Dobre moj takze " + s.movie.name + " dna " + s.day + " o " + s.time + " v " + s.hall.type);

    if (this.userService.get() === undefined) {
      alert('Please log in.');
    }
    else {
      this.router.navigate(['/reservation', s.id]);
    }
  }

}
