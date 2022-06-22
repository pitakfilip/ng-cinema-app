import { Component } from '@angular/core';
import {UserService} from "../user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../domain/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent{
  user : string | undefined;
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  formSubmitError : boolean;
  formSignInError : boolean;

  constructor(private userService : UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(6)]),
      date : new FormControl('', [Validators.required])
    });

    this.user = userService.get()?.name;

    this.formSubmitError = false;
    this.formSignInError = false;
  }

  get emailField(): any {
    return this.loginForm.get('email');
  }
  get passwordField(): any {
    return this.loginForm.get('password');
  }

  get emailFieldSignup(): any {
    return this.signupForm.get('email');
  }
  get passwordFieldSignup(): any {
    return this.signupForm.get('password');
  }
  get fullNameField(): any {
    return this.signupForm.get('fullName');
  }
  get dateField(): any {
    return this.signupForm.get('date');
  }

  async verifyLogin(){
    try {
      const response = await this.userService.login(this.loginForm.value.email);
      if (response == null) {
        this.formSubmitError = true;
      }
      else {
        if (response.password == this.loginForm.value.password){
          this.formSubmitError = false;
          this.user = response.name;
          this.userService.save(response);
          // @ts-ignore
          document.getElementById('done_login').click();
        }
        else {
          this.formSubmitError = true;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  loginFormSubmit() {}

  async existUserMail() {
    try {
      const res = await this.userService.exists(this.signupForm.value.email);
      return res;
    } catch (e) {
      console.log(e);
    }
    return undefined;
  }

  async verifySignupFormSubmit() {
    try {
      if (await this.existUserMail()){
        this.formSignInError = true;
      }
      else {
        let newUser = {} as User;
        newUser.name = this.signupForm.value.fullName;
        newUser.dateOfBirth = this.signupForm.value.date;
        newUser.email = this.signupForm.value.email;
        newUser.password = this.signupForm.value.password;
        newUser.admin = false;

        this.user = newUser.name;
        this.userService.add(newUser)
          .subscribe(val => {
            this.resetFormError();
            this.userService.save(val);
            //@ts-ignore
            document.getElementById('done_signin').click();
          })
      }
    } catch (e) {
      console.log(e)
    }

  }

  signupFormSubmit () {}

  resetFormError() {
    this.formSubmitError = false;
    this.formSignInError = false;
  }

  logout () {
    this.user = undefined;
    this.userService.logout();
  }



}
