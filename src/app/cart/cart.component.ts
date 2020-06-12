import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from './cart.service';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartData: any = [];
  cartDataUpdateSubscription: Subscription;

  constructor(private cartService: CartService, private appService: AppService,
      private notificationService: NotificationService) { }

  ngOnInit(): void {
      this.setCartData(this.cartService.getCartData());
      this.cartDataUpdateSubscription = this.cartService.cardDataUpdateNotifier().subscribe(data => {
        this.setCartData(data);
      });
  }

  ngOnDestroy() {
    this.cartDataUpdateSubscription.unsubscribe();
  }

  setCartData(cartData) {
    this.cartData = cartData;
    this.updateImageUrl();
  }

  updateImageUrl() {
    for(let product of this.cartData) {
        product['image'] = this.cartService.getProductImageUrl(product['productId']);
    }
  }

  udpateQuantity(product, index) {
    if(product.quantity < 1) {
      this.notificationService.notify("Please enter valid quantity!", "error");
      return;
    }
    this.appService.enableLoading();
    this.cartService.updateProductQuantity(product).subscribe((result: any) => {
      this.appService.disableLoading();
      this.notificationService.notify(result['message'], "success");
      this.cartService.getCartData()[index] = product;
    }, error => {
      this.appService.disableLoading();
      this.appService.appErrorHandler(error);
    });
  }

  deleteProduct(productId, index) {
    this.appService.enableLoading();
    this.cartService.deleteProductFromCart(productId).subscribe((result: any) => {
      this.appService.disableLoading();
      this.notificationService.notify(result['message'], "success");
      this.cartService.getCartData().splice(index, 1);
    }, error => {
      this.appService.disableLoading();
      this.appService.appErrorHandler(error);
    });
  }
}
