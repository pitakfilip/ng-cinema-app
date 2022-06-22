import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Price} from "./domain/price";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http : HttpClient) { }

  getAll() {
    return this.http.get<Price[]>('/api/prices');
  }
}
