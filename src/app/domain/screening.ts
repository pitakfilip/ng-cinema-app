import {Movie} from "./movie";
import {Hall} from "./hall";
import {Time} from "@angular/common";

export interface Screening {
  id : number;
  movie : Movie;
  hall : Hall;
  day : Date;
  time : Time;
}
