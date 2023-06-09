import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/items";

  getItemById(itemId: String): Observable<any>{
    return this.http.get(this.api+"/"+itemId);
  }

  saveItem(item: Item): Observable<any>{
    return this.http.post(this.api, item);
  }

  updateItem(itemId: string, item: Item): Observable<any>{
    return this.http.put(this.api+"/"+itemId, item);
  }

  deleteItem(itemId: string): Observable<any>{
    return this.http.delete(this.api+"/"+itemId);
  }
}
