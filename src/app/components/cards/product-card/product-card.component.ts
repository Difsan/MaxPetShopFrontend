import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductServiceService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  
  constructor(private router: Router,
    private productService: ProductServiceService){}
  
  @Input() product: Product ={
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

  AddToCart(){}
}
