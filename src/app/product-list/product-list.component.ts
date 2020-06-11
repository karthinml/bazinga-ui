import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart-service.component';
import { AppService } from '../app.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: any = [];
  userId: string = null;

  constructor(private cartservice: CartService, private appService: AppService,
      private notificationService: NotificationService) { 
    for(let product in PRODUCT_LIST) {
      this.productList.push(PRODUCT_LIST[product]);
    }
    console.log(JSON.stringify(this.productList))
    this.userId = this.appService.getUserDetails()['userId'];
  }

  ngOnInit(): void {
    
  }

  addToCart(product) {
    console.log(JSON.stringify(product))
    let cartRequest = {
      "productId": product.productId,
      "productName": product.productName,
      "description": product.description,
      "price": product.price,
      "quantity": (product.quantity == undefined || product.quantity == 0) ? 1 : product.quantity ,
      "userId": this.userId
    }
    this.cartservice.addProductToCart(cartRequest).subscribe(result => {
      this.notificationService.notify(result['data'], "success");
      this.cartservice.addedProductToCart(cartRequest);
    }, error => {
      console.log("=================================")
      console.log(JSON.stringify(error))
      this.notificationService.notify(error['error'], "error");
    })
  }

}

export const PRODUCT_LIST: any = {
  "101" : {"productId":101,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"},
  "102" : {"productId":102,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"},
  "103" : {"productId":103,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"},
  "104" : {"productId":104,"productName":"SamsungM30","description":"Android Smartphone",
  "price":15000.0, "image": "assets/icons/cart.jpg"}
};