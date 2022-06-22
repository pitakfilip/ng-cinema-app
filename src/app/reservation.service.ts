import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Reservation} from "./domain/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient) { }

  add(res : Reservation){
    return this.http.post<number>('/api/reservations', res);
  }

  getAll() {
    return this.http.get('/api/reservations');
  }
}
