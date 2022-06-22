import { Component, OnInit } from '@angular/core';
import {TicketService} from "../ticket.service";
import {Ticket} from "../domain/ticket";
import {Screening} from "../domain/screening";
import {ScreeningService} from "../screening.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PriceService} from "../price.service";
import {Price} from "../domain/price";
import {VoucherService} from "../voucher.service";
import {UserService} from "../user.service";
import {Reservation} from "../domain/reservation";
import {Time} from "@angular/common";
import {ReservationService} from "../reservation.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styles: [
  ]
})

export class ReservationComponent {

  tickets : Ticket[] | undefined;
  screening : Screening | undefined;
  id : number | undefined;
  ticketSelection = [2,0,0,0];
  ticketCount : number = 0;
  finalPrice : number = 0;
  selectedTicketCount = false;
  freeTickets : number | undefined;
  rows : number[] = [];
  seats : number[] = [];
  ticketState : number[][] = [[]];
  seatSelectionCount : number = 0;
  // voucherCode = "";
  // voucherDiscount = 0;
  // invalidVoucher = false;

  prices : Price[] | undefined;
  screenType : string = "";

  constructor(private ticketService : TicketService,
              private screeningService : ScreeningService,
              private priceService : PriceService,
              private voucherService : VoucherService,
              private userService : UserService,
              private reservationService : ReservationService,
              private route : ActivatedRoute,
              private router: Router) {

    this.id = Number(route.snapshot.paramMap.get("id"));
    this.reload();
  }

  reload() {
    this.priceService.getAll()
      .subscribe(value => {
        this.prices = value;
      })

    //@ts-ignore
    this.ticketService.getAllOfScreening(this.id)
      .subscribe(val => {
        this.tickets = val;
      });

    //@ts-ignore
    this.screeningService.getById(this.id)
      .subscribe(val => {
        this.screening = val;
        this.screenType = val.hall.type;
      })
  }

  freeTicketCount() {
    let count = 0;
    this.tickets?.forEach(t => {
      if (t.state == 'AVAILABLE') {
        count++;
      }
    });
    this.freeTickets = count;
    return count;
  }

  calcFinalPrice() {
    this.finalPrice = 0;
    let i = 0;
    //@ts-ignore
    for (let price of this.prices){
      // @ts-ignore
      this.finalPrice += (price.value*this.ticketSelection[i]);
      ++i;
    }
    return this.finalPrice;
  }

  verifyMax (i : number) {
    if (this.ticketSelection[i] > 5)
      this.ticketSelection[i]--;
  }

  confirmTickets() {
    this.ticketCount = 0;
    this.ticketSelection.forEach(x => this.ticketCount += x);
    if (this.finalPrice > 0 && (this.ticketCount <= this.freeTicketCount())) {
      this.selectedTicketCount = true;

      // @ts-ignore
      this.rows = Array(this.screening.hall.rows + 1).fill().map((a,b) =>b+1);

      // @ts-ignore
      this.seats = Array(this.screening.hall.seats + 1).fill().map((a,b) => b);

      // @ts-ignore
      this.ticketState = Array(this.screening.hall.rows).fill().map((a,b) =>
        // @ts-ignore
        Array(this.screening.hall.seats).fill().map((a,b) => 0)
      );

      this.tickets?.forEach(ticket => {
        if (ticket.state != 'AVAILABLE'){
          this.ticketState[ticket.seat.row-1][ticket.seat.seat-1] = 1;
        }
      });
      this.seatSelectionCount = 0;
    }
    else {
      alert("Not enough tickets available");
    }
  }

  clickSeat(row : number, seat : number) {
    if (this.ticketState[row-1][seat-1] == 0 && this.seatSelectionCount < this.ticketCount){
      this.ticketState[row-1][seat-1] = 2;
      this.seatSelectionCount++;
    }
    else {
      if (this.ticketState[row-1][seat-1] == 2){
        this.ticketState[row-1][seat-1] = 0;
        this.seatSelectionCount--;
      }
    }
  }

  confirmSeats(){
    if (this.seatSelectionCount < this.ticketCount)
      alert("Please pick a seat for each ticket.");
    else {
      let selected : Ticket[] = [];
      // @ts-ignore
      this.ticketState.forEach((arr, row) => {
        arr.forEach((val, seat) => {
          if (val == 2){
            this.tickets?.forEach(tk => {
              if (tk.seat.row-1 === row && tk.seat.seat-1 === seat){
                selected.push(tk);
              }
            })
          }
        })
      });

      let reservation = {} as Reservation;
      let now = new Date(Date.now());
      let t = {} as Time;
      reservation.created = now;
      reservation.pending = false;
      reservation.price = this.finalPrice;
      //@ts-ignore
      reservation.userAcc = this.userService.get();
      //@ts-ignore
      reservation.screening = this.screening;

      this.reservationService.add(reservation)
        .subscribe(value => {
          // @ts-ignore
          reservation.id = value;
        });

      selected.forEach(ticket => {
        //@ts-ignore
        ticket.reservation = reservation.id;
        ticket.state = 'RESERVED';

        this.ticketService.reserve(ticket, reservation.id)
          .subscribe(val => {});
      })

      this.router.navigate(['/home']);
    }

  }

}
