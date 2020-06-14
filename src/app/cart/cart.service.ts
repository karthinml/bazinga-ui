import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppService } from '../app.service';
import { SERVICE_BASE_URL } from '../app.constants';
import { Subject, Observable } from 'rxjs';
import { PRODUCT_LIST } from '../product-list/product-list.component';

@Injectable()
export class CartService {

    userId: string = null;
    private cartData: any = [];
    private notifyCartDataUpdate = new Subject<any>();

    constructor(private http: HttpClient, private appService: AppService) {
        this.userId = this.appService.getUserDetails()['userId'];
    }

    getProductsInCart() {
        return this.http.get<any>(SERVICE_BASE_URL+'/cart/'+this.userId).subscribe(
            response => { 
              this.cartData = response.cartItems != undefined ? response.cartItems : [];
              this.notifyCartDataUpdate.next(this.cartData);
              return response; 
            } ,
            error => { 
              return error; 
            }
        );
    }

    addProductToCart(request) {
        return this.http.post<any>(SERVICE_BASE_URL+'/cart', request);
    }

    updateProductQuantity(item) {
        return this.http.put<any>(SERVICE_BASE_URL+'/item/'+item.itemId, {"quantity": item.quantity});
    }

    deleteProductFromCart(itemId) {
      return this.http.delete<any>(SERVICE_BASE_URL+'/item/'+itemId);
    }

    addedProductToCart(data) {
      this.cartData = data;
      this.notifyCartDataUpdate.next(data);
    }

    cardDataUpdateNotifier(): Observable<any> {
      return this.notifyCartDataUpdate.asObservable();
    }

    getCartData() {
      return this.cartData;
    }

    getProductImageUrl(productId) {
      let productDetails = PRODUCT_LIST[productId];
      if(productId != undefined) {
        return productDetails['image'];
      }
      return '';
    }
}