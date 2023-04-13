import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {

  isAuth: boolean;

  constructor(
    private router: Router,
    private cartService: CartService,
    private variablesService: SharedVariablesService
  ) {
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
  }

  @Input() item: Item = {
    id: undefined,
    product: undefined,
    quantity: 1,
    subTotal: 0.0
  }

  goToRemoveItem(itemId: string|undefined){
    this.router.navigate(['/carts/removeItem'],{
      queryParams:{
        data: JSON.stringify(itemId)
      }
    });
  }



}
