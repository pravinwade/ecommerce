import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from '../_Modals/url';
import { AllActionNames } from '../_Modals/all-action-names';
import { Login } from '../_Modals/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: Http) { }

  checkLoginStatus(LoginModal: Login) {
    return this.http.post(Url.WebApiURL + AllActionNames.LoginStatusCheck, JSON.stringify(LoginModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }
}
