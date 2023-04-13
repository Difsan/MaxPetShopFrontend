import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';

import { Item } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  isAuth: boolean;

  p: number = 0;
  cart: Cart | undefined;
  items: Item[] | undefined = [];
  itemId: string | undefined;
  total: number | undefined = this.items?.length;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private variablesService: SharedVariablesService,
    private cartService: CartService
  ) { 
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
}

  ngOnInit(): void {
    this.route.queryParams.subscribe((info)=>{
      if(JSON.stringify(info) !== JSON.stringify({})){
        this.itemId = JSON.parse(info['data']);
        this.removeItem(this.itemId);
      }

    })

    if (this.isAuth) {
      
      this.cartService.getCartById(this.variablesService.user?.cart?.id).subscribe(
        (answer) => {
          console.log(answer);
          this.cart = answer;
          this.items = this.cart?.items;
          console.log(this.items);
          this.total = this.items?.length;

        },
        (Error) => {
          console.error('error caught in component' + Error);
        })
    }
  }

  removeItem(itemId: string | undefined) {
    if (this.isAuth && confirm(`Are you sure of remove that product from your shopping cart?`)) {
      this.cartService.removeItemFromList(this.variablesService.user?.cart?.id, itemId)
      .subscribe(
        (answer) => {
          console.log(answer);
          this.router.navigate(['/carts']);
          //location.replace('carts/removeItem');
        },
        (error) => {
          console.log(error);
        }
      )
    } else {
      this.router.navigate(['/users/login']);
    }
  }

  goToReceipt(){
    this.router.navigate(['/receipts']);
  }
}

