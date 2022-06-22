import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hall} from "./domain/hall";

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get<Hall[]>('/api/halls');
  }

  deleteId(id : number) {
    return this.http.delete<void>(`/api/halls/${id}`);
  }
}
