import {Time} from "@angular/common";
import {User} from "./user";
import {Screening} from "./screening";
import {Voucher} from "./voucher";

export interface Reservation {
  id : number;
  created : Date;
  pending : boolean;
  price : number;
  userAcc : User;
  screening : Screening;
  voucher : Voucher;
}
