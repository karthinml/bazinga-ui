import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
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
    for (let product in PRODUCT_LIST) {
      this.productList.push(PRODUCT_LIST[product]);
    }
    this.userId = this.appService.getUserDetails()['userId'];
  }

  ngOnInit(): void {

  }

  addToCart(product) {
    let cartRequest = {
      "productId": product.productId,
      "productName": product.productName,
      "description": product.description,
      "price": product.price,
      "quantity": (product.quantity == undefined || product.quantity == 0) ? 1 : product.quantity,
      "userId": this.userId
    }
    this.appService.enableLoading();
    this.cartservice.addProductToCart(cartRequest).subscribe((result: any) => {
      this.appService.disableLoading();
      this.notificationService.notify(result, "success");
      this.cartservice.addedProductToCart(cartRequest);
    }, error => {
      this.appService.disableLoading();
      this.notificationService.notify(error['error'], "error");
    });
  }

}

export const PRODUCT_LIST: any = {
  "101": {
    "productId": 101, "productName": "OPPO F15", "description": "OPPO F15 (Lightening Black, 8GB RAM, 128GB Storage) with No Cost EMI/Additional Exchange Offers",
    "price": 21990.00, "image": "assets/icons/oppoF15.jpg"
  },
  "102": {
    "productId": 102, "productName": "Samsung Galaxy M30s", "description": "Samsung Galaxy M30s (Opal Black, 4GB RAM, 64GB Storage)",
    "price": 15999.00, "image": "assets/icons/SamsungM30.jpg"
  },
  "103": {
    "productId": 103, "productName": "Samsung Galaxy M40", "description": "Samsung Galaxy M40 (Midnight Blue, 6GB RAM, 128GB Storage)",
    "price": 179999.00, "image": "assets/icons/SamsungM40.jpg"
  },
  "104": {
    "productId": 104, "productName": "Redmi K20 Pro", "description": "Redmi K20 Pro (Pearl White, 6GB RAM, 128GB Storage) - Extra 2,000 Off on Exchange &12 Month No Cost EMI",
    "price": 26850.00, "image": "assets/icons/redmik20.jpg"
  },
  "105": {
    "productId": 105, "productName": "Redmi Note 8", "description": "Redmi Note 8 (Neptune Blue, 6GB RAM, 128GB Storage)",
    "price": 14999.00, "image": "assets/icons/RedmiNote8.jpg"
  }
};