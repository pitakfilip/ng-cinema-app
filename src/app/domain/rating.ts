import {User} from "./user";

export interface Rating {
  id: number;
  value: number;
  comment: string;
  created: Date;
  movie: string;
  userAcc: User;
}
