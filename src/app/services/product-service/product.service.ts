import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/products";

  getAllProducts(): Observable<any>{
    return this.http.get(this.api);
  }

  getProductById(productId: String): Observable<any>{
    return this.http.get(this.api+"/"+productId);
  }

  getProductByName(productName: String): Observable<any>{
    return this.http.get(this.api+"/byName/"+productName);
  }

  getProductByAnimalType(productAnimalType: String): Observable<any>{
    return this.http.get(this.api+"/byAnimalType/"+productAnimalType);
  }

  getProductByCategory(productCategory: String): Observable<any>{
    return this.http.get(this.api+"/byCategory/"+productCategory);
  }

  saveProduct(product: Product): Observable<any>{
    return this.http.post(this.api, product);
  }

  updateProduct(productId: string, product: Product): Observable<any>{
    return this.http.put(this.api+"/"+productId, product);
  }

  deleteUser(productId: string): Observable<any>{
    return this.http.delete(this.api+"/"+productId);
  }
}
