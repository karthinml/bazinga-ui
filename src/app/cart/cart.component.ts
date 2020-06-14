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
      console.log("Cart service data")
      console.log(this.cartService.getCartData())
      this.cartDataUpdateSubscription = this.cartService.cardDataUpdateNotifier().subscribe(data => {
        console.log("Cart update notified to cart componnet.....................")
        console.log(data)
        this.setCartData(data);
      });
  }

  ngOnDestroy() {
   // this.cartDataUpdateSubscription.unsubscribe();
  }

  setCartData(cartData) {
    console.log(cartData)
    this.cartData = cartData;
    this.updateImageUrl();
    console.log(cartData)
  }

  updateImageUrl() {
    console.log("Updating inamge url...................")
    for(let item of this.cartData) {
        item['image'] = this.cartService.getProductImageUrl(item['productId']);
    }
  }

  udpateQuantity(item, index) {
    if(item.quantity < 1) {
      this.notificationService.notify("Please enter valid quantity!", "error");
      return;
    }
    this.appService.enableLoading();
    this.cartService.updateProductQuantity(item).subscribe((result: any) => {
      this.appService.disableLoading();
      this.notificationService.notify("Cart updated succssfully", "success");
      this.cartService.getCartData()[index] = item;
    }, error => {
      this.appService.disableLoading();
      this.appService.appErrorHandler(error);
    });
  }

  deleteItem(itemId, index) {
    this.appService.enableLoading();
    this.cartService.deleteProductFromCart(itemId).subscribe((result: any) => {
      this.appService.disableLoading();
      this.notificationService.notify("Product removed successfully", "success");
      this.cartService.getCartData().splice(index, 1);
    }, error => {
      this.appService.disableLoading();
      this.appService.appErrorHandler(error);
    });
  }
}
