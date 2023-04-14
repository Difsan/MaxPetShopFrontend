import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { ProductServiceService } from 'src/app/services/product-service/product.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  isAuth: boolean;

  cartId: string | undefined = this.variablesService.user?.cart?.id;

  item: Item = {
    id: undefined,
    product: undefined,
    quantity: 1,
    subTotal: 0.0
  }

  constructor(private router: Router,
    private productService: ProductServiceService,
    private itemService: ItemService,
    private variablesService: SharedVariablesService,
    private cartService: CartService
  ) {
    this.isAuth = this.variablesService.isAuth;
    variablesService.isAuthChanged.subscribe((newValue: boolean) => {
      this.isAuth = newValue;
    });
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  @Input() product: Product = {
    id: '',
    name: '',
    brand: '',
    description: '',
    image: '',
    animalType: '',
    category: '',
    unitaryPrice: 0.0,
    inventory: 0,
    inStock: false
  }

  ngSaveItem() {
    //console.log(this.product)
    //console.log("Default Item: " + this.item.product);

    if (this.isAuth) {
      this.item.product = this.product;
      this.item.subTotal = this.item.quantity * this.item.product.unitaryPrice;
      //console.log("Item before save it: " + this.item.product.id);
      this.itemService.saveItem(this.item).subscribe((answer) => {
        //alert("Item was saved successfully");
        //console.log("this is the answer" + answer);
        this.item = answer;
        //console.log("ItemId after save it: " + this.item.id);
        //console.log("Item after save it: " + this.item.product?.id);
        this.ngAddItemToCart(this.item);
      },
        (Error) => {
          console.error('error caught in component' + Error);
        }
      );
    } else {
      this.router.navigate(['/users/login']);
    }

  }

  ngAddItemToCart(item: Item) {
    /*this.cartService.getCartById(this.cartId).subscribe((answer) => {
      console.log("this is the cartbyId inside add item: " + answer);
    })*/
    this.cartService.addItemToList(this.cartId, this.item.id).subscribe((answer) => {
      //console.log("this is the cart after add item: " + answer);
      alert("Product was added to cart successfully");
    },
    (error) => {
      console.log(error)
      alert("An error occurred while adding the item to the cart: "+ error.error)
    })
    
  }
}
