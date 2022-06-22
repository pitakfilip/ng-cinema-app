import {Seat} from "./seat";
import {Reservation} from "./reservation";

export interface Ticket {
  id : number;
  state : string;
  seat : Seat;
  reservation : Reservation;
}
