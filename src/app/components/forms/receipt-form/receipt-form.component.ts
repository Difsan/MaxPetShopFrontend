import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

import { User } from 'src/app/models/user.model';
import { Item } from 'src/app/models/item.model';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ReceiptService } from 'src/app/services/receipt-service/receipt.service';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent implements OnInit{
  isAuth: boolean;
  receiptForm: FormGroup;
  receiptItems: Item[] = [];
  cart : Cart|undefined;
  user: User|undefined = this.variablesService.user;
  displayedColumns: string[] = ['item', 'quantity', 'price', 'subTotal'];

  choseQuantity: number[] | undefined;
  //totalPrice: number = 0;

  constructor(
    private variablesService: SharedVariablesService,
    private cartService: CartService,
    private receiptService: ReceiptService,
    private productService: ProductServiceService,
    private router: Router
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
    //console.log('choseQuantity:', this.choseQuantity);
    //console.log('totalPrice:', this.totalPrice);
    this.loadCart();
    //this.loadProductInventary();
  }
  
  createReceipt(): void{
    //console.log("entrando a crear recibo");
    //console.log("cart BEFORE modify according with input", this.cart);
    //modify the cart that will be inside the receipt
    const updatedItems = this.receiptItems.map((item, index) => {
      const newQuantity = this.choseQuantity![index];
      const newSubTotal = newQuantity * item.product!.unitaryPrice;
      return {...item, quantity: newQuantity, subTotal:newSubTotal}
    })
    this.cart!.items = updatedItems;
    ////console.log("cart AFTER modify according with input", this.cart);
    const totalPrice = updatedItems.reduce((total, item) => total + item.subTotal, 0);
    this.cart!.totalPrice = totalPrice;
    ////console.log("cart AFTER modify the TOTALPRICE", this.cart);
    this.receiptForm.get('cart')?.setValue(this.cart);
    this.receiptForm.get('createDate')?.setValue(new Date());

    //console.log("cart before modify according with input", this.cart);

    this.receiptService.saveReceipt(this.receiptForm.value).subscribe(
      (answer)=>{
        //console.log("after save user with service");
        //console.log(answer);
        alert("receipt created");
        this.goToChangeCart();

      }, (error) => {
        console.log(error.error);
      }
    )
  }

  loadCart(): void{
    this.cartService.getCartById(this.variablesService.user?.cart?.id).subscribe(
      (answer)=>{
        //console.log(answer);
        this.cart = answer;
        this.receiptForm.get('cart')?.setValue(this.cart);
        //console.log(this.receiptItems);
        //console.log(this.cart);
        if(this.cart?.items!=undefined){
          this.receiptItems = this.cart?.items;
          //console.log(this.receiptItems);
          this.choseQuantity = new Array(this.receiptItems.length).fill(1);
          
        }    
    },
    (error) => {
      console.log(error);
    })
  }

  get totalPrice() {
    let sum = 0;
    for (let i = 0; i < this.receiptItems.length; i++) {
      const item = this.receiptItems[i];
      sum += this.choseQuantity![i] * item.product!.unitaryPrice;
    }
    return sum;
  }

  loadProductInventary(){
    //this.productService.getProductById(this.receiptItems..product.id)
  }

  goToChangeCart(): void{
    this.router.navigate(['/carts/modify']);
  }
}
