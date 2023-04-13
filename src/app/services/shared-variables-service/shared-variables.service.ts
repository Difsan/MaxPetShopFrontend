import { EventEmitter, Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {

  choseAnimalType: string='';
  isAuth: boolean = false;
  // to emit any change of this variable
  isAuthChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  userId: string|undefined;
  user: User | undefined;
  
  setIsAuth(newValue: boolean){
    this.isAuth = newValue;
    this.isAuthChanged.emit(this.isAuth);
  }
}
