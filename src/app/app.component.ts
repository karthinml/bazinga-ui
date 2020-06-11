import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart/cart.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'BAZINGA';
  enableLoading: boolean = false;
  cartDataChangeSubscription: Subscription;
  loadingSubscription: Subscription;
  cartData: any = [];

  constructor(private cartService: CartService, private appService: AppService) {

  }

  ngOnInit() {
    this.cartService.getProductsInCart();
    this.cartDataChangeSubscription = this.cartService.cardDataUpdateNotifier().subscribe(data => {
      this.cartData = data;
    });
    this.loadingSubscription = this.appService.listenLoader().subscribe(data => {
      this.enableLoading = data;
    });
  }

  ngOnDestroy() {
    this.cartDataChangeSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
