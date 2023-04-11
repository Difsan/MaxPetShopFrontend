import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from 'src/app/models/receipt.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/receipts";

  getReceiptById(receiptId: String): Observable<any>{
    return this.http.get(this.api+"/"+receiptId);
  }

  getReceiptByUserId(userId: String): Observable<any>{
    return this.http.get(this.api+"/byUserId/"+userId);
  }

  saveUser(receipt: Receipt): Observable<any>{
    return this.http.post(this.api, receipt);
  }

  updateUser(receiptId: string, receipt: Receipt): Observable<any>{
    return this.http.put(this.api+"/"+receiptId, receipt);
  }

  deleteUser(receiptId: string): Observable<any>{
    return this.http.delete(this.api+"/"+receiptId);
  }
}
