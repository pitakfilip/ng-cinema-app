import {User} from "./user";

export interface Voucher {
  id : number;
  userAcc : User;
  code : string;
  date : Date;
  valid : boolean;
  used : boolean;
  type : string;
  value : number;
  restriction : number;
}
