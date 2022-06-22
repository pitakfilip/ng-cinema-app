import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Screening} from "./domain/screening";

@Injectable({
  providedIn: 'root'
})
export class ScreeningService {

  constructor(private http : HttpClient) {}

  getAll() {
    return this.http.get<Screening[]>('/api/screenings');
  }

  getByDay (date : string){
    return this.http.get<Screening[]>(`/api/screenings/ofDay/${date}`);
  }

  getById (id : number) {
    return this.http.get<Screening>(`/api/screenings/${id}`);
  }
}
