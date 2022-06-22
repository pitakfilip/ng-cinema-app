import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ReservationService} from "../reservation.service";
import {Reservation} from "../domain/reservation";
import {TicketService} from "../ticket.service";
import {Ticket} from "../domain/ticket";

@Component({
  selector: 'app-dash-reservations',
  templateUrl: './dash-reservations.component.html',
  styles: [
  ]
})
export class DashReservationsComponent {

  allReservations : Reservation[] | undefined;

  constructor(private userService : UserService,
              private reservationService : ReservationService,
              private ticketService : TicketService) {
    this.loadData();
  }

  loadData() {
    this.reservationService.getAll()
      .subscribe(val => {
        //@ts-ignore
        this.allReservations = val;
      })
  }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }

}
