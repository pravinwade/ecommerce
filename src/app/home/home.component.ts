import { Component, OnInit } from '@angular/core';
import { SubcategoryService } from '../_Services/subcategory.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  getFreeSubCategoryDetails = [];
  getSaleSubCategoryDetails = [];

  constructor(private subCateogry: SubcategoryService) { 
    
  }

  getdata(id, price, img, desc, imgsize) {
    $(document).ready(function () {
      let _split = [];
      _split = id.split('_');
      
      $("#catid").val(_split[1]);
      $("#UserName").text($('#' + id).text());
      $("#SubCategoryPrice").text($('#' + price).text());
      $("#imgsubcategory").attr('src', $('#' + img).attr('src'));
      $("#pDescription").text($('#' + desc).val());
      $("#h4imgsize").text($('#' + imgsize).val());
    });
  }

  ngOnInit() {
    this.subCateogry.getFreeSubCategoryDetails().subscribe(Response => {
      this.getFreeSubCategoryDetails = [Response[0]][0];
    });

    this.subCateogry.getSaleSubCategoryDetails().subscribe(Response => {
      this.getSaleSubCategoryDetails = [Response[0]][0];
    });
  }
}
