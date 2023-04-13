import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/carts";

  getCartById(cartId: String|undefined): Observable<any>{
    return this.http.get(this.api+"/"+cartId);
  }

  saveCart({}): Observable<any>{
    return this.http.post(this.api, {});
  }

  addItemToList(cartId: string| undefined, itemId: string| undefined): Observable<any>{
    return this.http.post(this.api+"/"+cartId+"/addItem/"+itemId, null)
  }

  removeItemFromList(cartId: string| undefined, itemId: string| undefined): Observable<any>{
    return this.http.post(this.api+"/"+cartId+"/removeItem/"+itemId, null)
  }

  updateCart(cartId: string|undefined, cart: Cart|undefined): Observable<any>{
    return this.http.put(this.api+"/"+cartId, cart);
  }

  deleteCart(cartId: string): Observable<any>{
    return this.http.delete(this.api+"/"+cartId);
  }
}
