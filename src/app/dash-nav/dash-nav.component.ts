import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dash-nav',
  templateUrl: './dash-nav.component.html',
  styles: [
  ]
})
export class DashNavComponent {

  constructor(private router : Router) { }

  isRoute(route : string){
    return this.router.url.includes(route);
  }

}
