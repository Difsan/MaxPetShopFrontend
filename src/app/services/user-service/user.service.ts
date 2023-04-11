import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  api: string = "http://localhost:8080/users";

  getUserById(userId: String): Observable<any>{
    return this.http.get(this.api+"/"+userId);
  }

  getUserByIdCart(cartId: String): Observable<any>{
    return this.http.get(this.api+"/byCartId/"+cartId);
  }
  
  saveUser(user: User): Observable<any>{
    return this.http.post(this.api, user);
  }

  updateUser(userId: string, user: User): Observable<any>{
    return this.http.put(this.api+"/"+userId, user);
  }

  deleteUser(userId: string): Observable<any>{
    return this.http.delete(this.api+"/"+userId);
  }

}
