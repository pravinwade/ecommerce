import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from '../_Services/cart.service';
import * as $ from 'jquery';
import { CheckoutService } from '../_Services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck {
  ngDoCheck(): void {
    $("#spanGrandTotal").text(this.cartService.grandtotal);
    $("#aProductCount").text(this.cartService.ProductCount);
  }
  getcartdata = [];
  
  constructor(private chkout: CheckoutService, private cartService: CartService) { }

  ngOnInit() {
     this.getcartdata = this.cartService.getcartdata;
     this.totalcount();
  }

  deletecart(id) {
    let actualamt: number;

    actualamt = $("#spanGrandTotal").text() - parseFloat($("#tdtotal_" + id).text());
    $("#spanGrandTotal").text(actualamt);
    this.cartService.getcartdata.splice(id, 1);
    this.cartService.grandtotal = actualamt;
    this.chkout.PaidAmt = actualamt;
    this.cartService.ProductCount -= 1;
    $("#aProductCount").text(this.cartService.ProductCount);
  }

  updateamt(id, ArtImgPerCost, Quantity){
    let total1 = 0;
    
    $("#tdtotal_" + id).text(parseFloat(ArtImgPerCost) * parseFloat(Quantity))

    for (let index = 0; index < this.getcartdata.length; index++) {
      total1 += parseFloat($("#tdtotal_" + index).text());
    }

    this.cartService.grandtotal = total1;
    this.chkout.PaidAmt = total1;
    $("#spanGrandTotal").text(total1);
  }

  totalcount() {
    let total3 = 0;

    for (let index = 0; index < this.getcartdata.length; index++) {
      total3 += parseFloat(this.getcartdata[index].ArtImgPerCost);
    }

    this.cartService.grandtotal = total3;
    this.chkout.PaidAmt = total3;
    $("#spanGrandTotal").text(total3);
  }
}
