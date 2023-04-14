import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Item } from 'src/app/models/item.model';
import { Receipt } from 'src/app/models/receipt.model';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { ProductServiceService } from 'src/app/services/product-service/product.service';
import { ReceiptService } from 'src/app/services/receipt-service/receipt.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-receipt-card',
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.css']
})
export class ReceiptCardComponent implements OnInit {

  isAuth: boolean;

  items: Item[] = [];



  constructor(private router: Router,
    private variablesService: SharedVariablesService,
    private receiptService: ReceiptService,
    private route: ActivatedRoute
  ) {
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
  }

  ngOnInit(): void {
    //console.log(this.receipt);
  }

  cart: Cart = {
    id: '',
    items: this.items,
    totalPrice: 0
  }

  user: User = {
    id: '',
    name: '',
    lastName: '',
    email: '',
    password: '',
    cart: this.cart
  }

  @Input() receipt: Receipt = {
    id: '',
    cart: this.cart,
    createDate: new Date(),
    user: this.user,
    phone: '',
    address: ''
  }

  goToDeleteReceipt(receiptId: string): void {
    this.router.navigate(['receipts/delete'],{
      queryParams:{
        data: JSON.stringify(receiptId)
      }
    })
  }
}
