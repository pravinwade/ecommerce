import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  getcartdata = [];
  grandtotal: number = 0;
  ProductCount: number = 0;
  
  constructor() { }
}
