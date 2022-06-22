import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from 'angular-2-local-storage';
import {User} from "./domain/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User | undefined;
  private key = "user-logged";

  constructor(private http : HttpClient,
              private localStorage : LocalStorageService) {
    this.user = localStorage.get(this.key) || undefined;
  }

  get () {
    return this.user;
  }

  save(user: User | undefined) {
    this.localStorage.set(this.key, user);
    this.user = user;
  }

  login (userMail : string) {
    return this.http.get<User>(`/api/users/login/${userMail}`).toPromise();
  }

  logout () {
    this.user = undefined;
    this.localStorage.set(this.key, undefined);
  }

  add (user : User) {
    return this.http.post<User>('/api/users', user);
  }

  exists (userMail : string) {
    return this.http.get<any>(`/api/users/exists/${userMail}`).toPromise();
  }

  getAll() {
    return this.http.get<User>('/api/users');
  }

}
