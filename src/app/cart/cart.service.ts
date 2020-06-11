import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppService } from '../app.service';
import { SERVICE_BASE_URL } from '../app.constants';
import { map } from "rxjs/operators";  
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
              this.cartData = response;
              this.notifyCartDataUpdate.next(this.cartData);
              return response; 
            } ,
            error => { 
              return error; 
            }
        );
    }

    addProductToCart(request) {
        return this.http.post<any>(SERVICE_BASE_URL+'/cart', request, { responseType: 'text' as 'json'});
    }

    updateProductQuantity(request) {
        return this.http.put<any>(SERVICE_BASE_URL+'/cart', request, { responseType: 'text' as 'json'});
    }

    deleteProductFromCart(productId) {
      return this.http.delete<any>(SERVICE_BASE_URL+'/cart/'+this.userId+'/'+productId, { responseType: 'text' as 'json'});
    }

    addedProductToCart(product) {
      this.cartData.push(product);
      this.notifyCartDataUpdate.next(this.cartData);
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