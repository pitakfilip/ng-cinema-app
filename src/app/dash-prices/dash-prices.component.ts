import { Component, OnInit } from '@angular/core';
import {VoucherService} from "../voucher.service";
import {UserService} from "../user.service";
import {PriceService} from "../price.service";
import {Price} from "../domain/price";

@Component({
  selector: 'app-dash-prices',
  templateUrl: './dash-prices.component.html',
  styles: [
  ]
})
export class DashPricesComponent{

  allPrices : Price[] | undefined;

  constructor(private priceService : PriceService,
              private userService : UserService) {
    this.loadData();
  }

  loadData() {
    this.priceService.getAll()
      .subscribe(val => {
        this.allPrices = val;
      });
  }


  checkLogin() {
    // @ts-ignore
    return this.userService.get().admin == true;
  }
}
