import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedVariablesService {

  choseAnimalType: string='';
  isAuth: boolean = true;
  userId: string = '';
}