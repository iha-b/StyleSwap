import { Injectable } from '@angular/core';
import {Parse} from 'parse';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  async login(username, password) {
    try {
      Parse.User.enableUnsafeCurrentUser()
      await Parse.User.logIn(username, password);
      console.log(Parse.User.current());
      //alert("Logged in!");
     // this.router.navigateByUrl('/profile');
    } catch (e) {
      throw e;
    }
  }

  async signUp(username, password, email) {
    let user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    try {
      await user.signUp();
      //alert("User created!");

    } catch (error) {
      // Show the error message somewhere and let the user try again.
      throw error;
    }
  }

}


