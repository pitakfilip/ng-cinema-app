import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../domain/user";

@Component({
  selector: 'app-dash-users',
  templateUrl: './dash-users.component.html',
  styles: [
  ]
})
export class DashUsersComponent{

  allUsers : User[] | undefined;

  constructor(private userService : UserService) {
    this.loadData();
  }

  loadData() {
    this.userService.getAll()
      .subscribe(val => {
        // @ts-ignore
        this.allUsers = val;
      })
  }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }

}
