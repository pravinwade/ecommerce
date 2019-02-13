import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../_Services/checkout.service';
import * as $ from 'jquery';
import { UserService } from '../_Services/user.service';
import { User } from '../_Modals/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  firstname: String;
  middlename: String;
  lastname: String;
  email: String;
  addr: String;
  mobile: String;
  _country: String;
  _state: String;
  _city: String;
  pincode: String;
  errorMsg: String;

  constructor(private router: Router, private chkout: CheckoutService, private userService: UserService, private userModal: User) { }

  ngOnInit() {
    if (this.userService.UserDetails.length > 0) {
      $("#spanamt").text(this.chkout.PaidAmt);
      $("#spanamt1").text(this.chkout.PaidAmt);

      this.firstname = this.userService.UserDetails[0].FirstName;
      this.middlename = this.userService.UserDetails[0].MiddleName;
      this.lastname = this.userService.UserDetails[0].LastName;
      this.email = this.userService.UserDetails[0].EmailId;
      this.addr = this.userService.UserDetails[0].Address;
      this.mobile = this.userService.UserDetails[0].MobileNo;
      this._country = this.userService.UserDetails[0].Country;
      this._city = this.userService.UserDetails[0].City;
      this._state = this.userService.UserDetails[0].State;
      this.pincode = this.userService.UserDetails[0].PinCode;
    } else {
      this.router.navigate(['/']);
    }
  }

  UpdateUserDetails() {
    this.errorMsg = '';
    this.userModal.UId = this.userService.UserDetails[0].UserId;
    this.userModal.FName = this.firstname;
    this.userModal.MName = this.middlename;
    this.userModal.LName = this.lastname;
    this.userModal.Email = this.email;
    this.userModal.Addr = this.addr;
    this.userModal.MobileNumber = this.mobile;
    this.userModal._Country = this._country;
    this.userModal._State = this._state;
    this.userModal._City = this._city;
    this.userModal.Zip = this.pincode;

    this.userService.UpdateUserCount(this.userModal).subscribe(Response => {
      let count = [Response[0][0]][0].UserCount;

      if (count > 0) {
        this.errorMsg = "Mobile number or email id already exist..";
      } else {
        this.userService.UpdateUserDetails(this.userModal).subscribe(Response => {
          this.errorMsg = 'User successfully updated';
        },
          error => {
            if (error.status === 0) {
              this.errorMsg = error + ' Server issue..';
            } else {
              this.errorMsg = error;
            }
          });
      }
    },
      error => {
        if (error.status === 0) {
          this.errorMsg = error + ' Server issue..';
        } else {
          this.errorMsg = error;
        }
      });
  }
}
