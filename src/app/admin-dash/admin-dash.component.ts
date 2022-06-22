import { Component } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styles: [
  ]
})
export class AdminDashComponent {

  constructor(private userService : UserService) { }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }

  totalTicketSold() {
    return 2541;
  }

  totalCustomers() {
    return 327;
  }

  totalMovies() {
    return 31;
  }
}
