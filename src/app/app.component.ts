import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'cinema-app';


  constructor(private router: Router,
              private userService : UserService) {}

  isRoute(route : string){
    return this.router.url.includes(route);
  }

  adminLogged() {
    let user = this.userService.get();
    console.log(user);
    if (user === undefined) return false;

    return user.admin;
  }
}
