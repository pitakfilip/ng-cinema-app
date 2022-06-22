import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Voucher} from "./domain/voucher";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http : HttpClient) { }

  getUsers(id : number) {
    return this.http.get<Voucher[]>(`/api/vouchers/user/${id}`);
  }

  getAll() {
    return this.http.get<Voucher[]>(`/api/vouchers/`);
  }
}
