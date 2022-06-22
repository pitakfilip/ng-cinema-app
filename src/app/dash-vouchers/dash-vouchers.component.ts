import { Component, OnInit } from '@angular/core';
import {VoucherService} from "../voucher.service";
import {UserService} from "../user.service";
import {Voucher} from "../domain/voucher";

@Component({
  selector: 'app-dash-vouchers',
  templateUrl: './dash-vouchers.component.html',
  styles: [
  ]
})
export class DashVouchersComponent {

  allVouchers : Voucher[] | undefined;
  constructor(private voucherService : VoucherService,
              private userService : UserService) {
    this.loadData();
  }

 loadData() {
    this.voucherService.getAll()
      .subscribe(val => {
        this.allVouchers = val;
      })
 }

  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }
}
