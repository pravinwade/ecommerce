import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Url } from '../_Modals/url';
import { AllActionNames } from '../_Modals/all-action-names';
import { SubCategory } from '../_Modals/sub-category';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: Http) { }

  getSubCategoryDetails(SubCategoryModal: SubCategory) {
    return this.http.post(Url.WebApiURL + AllActionNames.SubCategoryGet, JSON.stringify(SubCategoryModal))
      .map(response => {
        let result;
        return result = response.json();
      });
  }

  getFreeSubCategoryDetails() {
    return this.http.get(Url.WebApiURL + AllActionNames.SubCategoryFreeGet)
      .map(response => {
        let result;
        return result = response.json();
      });
  }

  getSaleSubCategoryDetails() {
    return this.http.get(Url.WebApiURL + AllActionNames.SubCategorySaleGet)
      .map(response => {
        let result;
        return result = response.json();
      });
  }
}
