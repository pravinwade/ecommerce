import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryService } from './_Services/category.service';
import { SubcategoryService } from './_Services/subcategory.service';
import { Url } from './_Modals/url';
import { AllActionNames } from './_Modals/all-action-names';
import { SubCategory } from './_Modals/sub-category';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Cart } from './_Modals/cart';
import { CartService } from './_Services/cart.service';
import { CheckoutService } from './_Services/checkout.service';
import { UserService } from './_Services/user.service';
import { LoginService } from './_Services/login.service';
import { Login } from './_Modals/Login';
import { User } from './_Modals/User';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    //Classes
    Url,
    AllActionNames,
    SubCategory,
    Cart,
    Login,
    User,
    
    //Services
    CategoryService,
    SubcategoryService,
    CartService,
    CheckoutService,
    UserService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
