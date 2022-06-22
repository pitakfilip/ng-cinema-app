import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {ScreeningService} from "../screening.service";
import {Screening} from "../domain/screening";

@Component({
  selector: 'app-dash-screenings',
  templateUrl: './dash-screenings.component.html',
  styles: [
  ]
})
export class DashScreeningsComponent {

  allScreenings : Screening[] | undefined;

  constructor(private userService : UserService,
              private screeningService : ScreeningService) {
    this.loadData();
  }

  loadData() {
    this.screeningService.getAll()
      .subscribe(val => {
        this.allScreenings = val;
      })
  }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }
}
