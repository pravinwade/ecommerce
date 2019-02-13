import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from '../_Modals/url';
import { AllActionNames } from '../_Modals/all-action-names';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: Http) { }

  getCategoryDetails() {
    return this.http.get(Url.WebApiURL + AllActionNames.CategoryGet)
      .map(response => {
        let result;
        return result = response.json();
      });
  }
}
