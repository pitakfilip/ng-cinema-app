import {Hall} from "./hall";

export interface Seat {
  id : number;
  hall : Hall;
  row : number;
  seat : number;
}
