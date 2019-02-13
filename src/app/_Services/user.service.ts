import { Injectable } from '@angular/core';
import { Url } from '../_Modals/url';
import { AllActionNames } from '../_Modals/all-action-names';
import { Http } from '@angular/http';
import { User } from '../_Modals/User';
import { Login } from '../_Modals/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserDetails = [];
  
  constructor(private http: Http) { }

  countUser(LoginModal: Login) {
    return this.http.post(Url.WebApiURL + AllActionNames.UserCount, JSON.stringify(LoginModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }
  
  getUserDetails(LoginModal: Login) {
    return this.http.post(Url.WebApiURL + AllActionNames.LoginDetailsGet, JSON.stringify(LoginModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }

  InsertUserDetails(UserModal: User) {
    return this.http.post(Url.WebApiURL + AllActionNames.UserInsertDetails, JSON.stringify(UserModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }

  UpdateUserDetails(UserModal: User) {
    return this.http.post(Url.WebApiURL + AllActionNames.UserDetailsUpdate, JSON.stringify(UserModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }

  UpdateUserCount(UserModal: User) {
    return this.http.post(Url.WebApiURL + AllActionNames.UserUpdateCount, JSON.stringify(UserModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }
}
