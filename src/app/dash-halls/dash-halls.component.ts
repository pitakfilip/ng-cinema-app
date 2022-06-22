import { Component, OnInit } from '@angular/core';
import {Hall} from "../domain/hall";
import {UserService} from "../user.service";
import {HallService} from "../hall.service";

@Component({
  selector: 'app-dash-halls',
  templateUrl: './dash-halls.component.html',
  styles: [
  ]
})
export class DashHallsComponent {

  allHalls : Hall[] | undefined;

  constructor(private userService : UserService,
              private hallService: HallService) {
    this.loadData();
  }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }

  loadData() {
    this.hallService.getAll()
      .subscribe(val => {
        this.allHalls = val;
      });
  }


}
