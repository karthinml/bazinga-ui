import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: any = [];

  constructor() { 
    this.productList = PRODUCT_LIST;
  }

  ngOnInit(): void {
  }

}

export const PRODUCT_LIST: any = [
  {"productId":101,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"},
  {"productId":101,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"},
  {"productId":101,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"},
  {"productId":101,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"}
];