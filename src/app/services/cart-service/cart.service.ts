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

  getCartById(cartId: String): Observable<any>{
    return this.http.get(this.api+"/"+cartId);
  }

  saveCart(cart: Cart): Observable<any>{
    return this.http.post(this.api, cart);
  }

  addItemToList(cartId: string, itemId: string): Observable<any>{
    return this.http.post(this.api+"/carts/"+cartId+"/addItem/"+itemId, null)
  }

  removeItemFromList(cartId: string, itemId: string): Observable<any>{
    return this.http.post(this.api+"/carts/"+cartId+"/removeItem/"+itemId, null)
  }

  updateCart(cartId: string, cart: Cart): Observable<any>{
    return this.http.put(this.api+"/"+cartId, cart);
  }

  deleteCart(cartId: string): Observable<any>{
    return this.http.delete(this.api+"/"+cartId);
  }
}
