import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticket} from "./domain/ticket";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http : HttpClient) { }

  getAllOfScreening(id : number) {
    return this.http.get<Ticket[]>(`/api/tickets/screening/${id}`);
  }

  add (ticket : Ticket) {
    return this.http.post<number>('/api/tickets', ticket);
  }

  reserve(ticket : Ticket, id : number) {
    return this.http.put(`/api/tickets/${ticket.id}?resId={$id}`, ticket);
  }

  getByReservation(id : number) {
    return this.http.get(`/api/tickets/reservation/${id}`);
  }
}
