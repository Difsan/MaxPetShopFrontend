import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

import { User } from 'src/app/models/user.model';
import { Item } from 'src/app/models/item.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ReceiptService } from 'src/app/services/receipt-service/receipt.service';
@Component({
  selector: 'app-receipt-card',
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.css']
})
export class ReceiptCardComponent implements OnInit {

  isAuth: boolean;
  receiptForm: FormGroup;
  receiptItems: Item[] = [];
  cart : Cart|undefined;
  user: User|undefined = this.variablesService.user;
  displayedColumns: string[] = ['item', 'quantity', 'price', 'total'];

  constructor(
    private variablesService: SharedVariablesService,
    private cartService: CartService,
    private receiptService: ReceiptService
  ) {
    this.receiptForm = new FormGroup({
      id: new FormControl(null),
      cart: new FormControl(this.cart),
      createDate: new FormControl(null),
      user: new FormControl(this.variablesService.user),
      phone: new FormControl(null),
      address: new FormControl(null),
    })

    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });

  }
  ngOnInit(): void {
    this.loadCart();
  }
  
  createReceipt(): void{
    console.log("entrando a crear recibo");
    this.receiptForm.get('createDate')?.setValue(new Date());
    this.receiptService.saveReceipt(this.receiptForm.value).subscribe(
      (answer)=>{
        console.log("after save user with service");
        console.log(answer);

      }, (error) => {
        console.log(error.error);
      }
    )
  }

  loadCart(): void{
    this.cartService.getCartById(this.variablesService.user?.cart?.id).subscribe(
      (answer)=>{
        console.log(answer);
        this.cart = answer;
        this.receiptForm.get('cart')?.setValue(this.cart);
        console.log(this.receiptItems);
        console.log(this.cart);
        if(this.cart?.items!=undefined){
          this.receiptItems = this.cart?.items;
          console.log(this.receiptItems);
        }    
    },
    (error) => {
      console.log(error);
    })
  }

}
