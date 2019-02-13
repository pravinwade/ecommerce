import { Component, OnInit } from '@angular/core';
import { CategoryService } from './_Services/category.service';
import { SubcategoryService } from './_Services/subcategory.service';
import { SubCategory } from './_Modals/sub-category';
import * as $ from 'jquery';
import { Cart } from './_Modals/cart';
import { CartService } from './_Services/cart.service';
import { CheckoutService } from './_Services/checkout.service';
import { LoginService } from './_Services/login.service';
import { Login } from './_Modals/Login';
import { UserService } from './_Services/user.service';
import { User } from './_Modals/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour of Heroes';
  getcategorydetails = [];
  getsubcategorydetails = [];
  getcartdata = [];
  SignUpEmailId: String;
  SignUpPassword: String;
  SignUpConfirmPassword: String;
  SignUpMobileNo: String;
  SignInEmailIdOrMobileNo: String;
  SignInPassword: String;
  signuperr: String;
  errorMsg: String;
  LoginStatus: Number = 0;

  constructor(private userService: UserService, private userModal: User, private loginService: LoginService, private loginModel: Login, private chkout: CheckoutService, private carts: Cart, private cartService: CartService, private category: CategoryService, private subCateogry: SubcategoryService, private subCategoryModal: SubCategory) { }

  ngOnInit(): void {
    this.cartService.getcartdata = this.getcartdata;

    this.category.getCategoryDetails().subscribe(Response => {
      this.getcategorydetails = [Response[0]][0];
    });
  }

  SignUp() {
    $("#signuperror").css('display', 'none');

    if (this.SignUpPassword !== this.SignUpConfirmPassword) {
      $("#signuperror").css('display', 'block');
      $("#signuperror").css('color', 'red');
      $("#signuperror").text('Password and Confirm Password mismatch');
    } else {
      this.loginModel.UserId = this.SignUpEmailId;
      this.loginModel.Password = this.SignUpPassword;

      this.userService.countUser(this.loginModel).subscribe(Response => {
        this.errorMsg = [Response[0]][0][0].UserCount;

        if (this.errorMsg == "1") {
          $("#signuperror").css('display', 'block');
          $("#signuperror").css('color', 'red');
          this.errorMsg = "User already exist";
          $("#signuperror").text(this.errorMsg);
        } else {
          this.loginModel.UserId = this.SignUpMobileNo;
          this.loginModel.Password = this.SignUpPassword;

          this.userService.countUser(this.loginModel).subscribe(Response => {
            this.errorMsg = [Response[0]][0][0].UserCount;

            if (this.errorMsg == "1") {
              $("#signuperror").css('display', 'block');
              $("#signuperror").css('color', 'red');
              this.errorMsg = "User already exist";
              $("#signuperror").text(this.errorMsg);
            } else {
              this.userModal.Email = this.SignUpEmailId;
              this.userModal.MobileNumber = this.SignUpMobileNo;
              this.userModal.Password = this.SignUpPassword;
              this.userModal.Addr = '';
              this.userModal.FName = '';
              this.userModal.MName = '';
              this.userModal.LName = '';
              this.userModal.Zip = '';
              this.userModal._City = '';
              this.userModal._State = '';
              this.userModal._Country = '';

              this.userService.InsertUserDetails(this.userModal).subscribe(Response => {
                $("#signuperror").css('display', 'block');
                $("#signuperror").css("color", "green");
                this.errorMsg = "User successfully added";
                $("#signuperror").text(this.errorMsg);
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
              }
            });
        }
      },
        error => {
          if (error.status === 0) {
            this.errorMsg = error + ' Server issue..';
          }
        });
    }
  }

  SignOut() {
    this.userService.UserDetails = [];
    this.LoginStatus = this.userService.UserDetails.length;
    $("#spanname").text('');
  }
  SignIn() {
    this.loginModel.UserId = this.SignInEmailIdOrMobileNo;
    this.loginModel.Password = this.SignInPassword;

    this.loginService.checkLoginStatus(this.loginModel).subscribe(Response => {
      this.errorMsg = [Response[0]][0][0].UserCount;

      if (this.errorMsg == "0") {
        this.errorMsg = "User name or password incorrect";
      } else {
        this.errorMsg = "";
        
        this.userService.getUserDetails(this.loginModel).subscribe(Response => {
          this.userService.UserDetails = Response[0];
          this.LoginStatus = this.userService.UserDetails.length;
          $("#login").hide();
          $("div").removeClass("close").removeClass("modal-backdrop");
          $("#spanname").text(this.userService.UserDetails[0].EmailId);
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

  loadsubcategory(categoryId: number) {
    this.subCategoryModal.CatId = categoryId;

    this.subCateogry.getSubCategoryDetails(this.subCategoryModal).subscribe(Response => {
      this.getsubcategorydetails = [Response[0]][0];
    });
  }

  fillcart() {
    this.carts.SubCategoryId = $("#catid").val();
    this.carts.SubCategoryName = $("#UserName").text();
    this.carts.SubCategoryImage = $('#imgsubcategory').attr('src');
    this.carts.ImageSize = $("#h4imgsize").text();
    this.carts.ArtImgPerCost = parseFloat($("#SubCategoryPrice").text());

    let count = 0;

    for (let index = 0; index < this.getcartdata.length; index++) {
      const element = this.getcartdata[index];

      if (element.SubCategoryName === this.carts.SubCategoryName) {
        count += 1;
      }
    }

    if (count === 0) {
      this.getcartdata.push({ SubCategoryId: this.carts.SubCategoryId, SubCategoryName: this.carts.SubCategoryName, SubCategoryImage: this.carts.SubCategoryImage, ImageSize: this.carts.ImageSize, ArtImgPerCost: this.carts.ArtImgPerCost });
      this.cartService.getcartdata = this.getcartdata;
      this.cartService.grandtotal += this.carts.ArtImgPerCost;
      this.chkout.PaidAmt += this.carts.ArtImgPerCost;
      this.cartService.ProductCount += 1;
      $("#aProductCount").text(this.cartService.ProductCount);
    }
  }

  getdata(id, price, img, desc, imgsize) {
    $(document).ready(function () {
      let _split = [];
      _split = id.split('_');

      $("#catid").val(_split[1]);
      $("#UserName").text($('#' + id).val());
      $("#SubCategoryPrice").text($('#' + price).val());
      $("#imgsubcategory").attr('src', $('#' + img).attr('src'));
      $("#pDescription").text($('#' + desc).val());
      $("#h4imgsize").text($('#' + imgsize).val());
    });
  }
}
