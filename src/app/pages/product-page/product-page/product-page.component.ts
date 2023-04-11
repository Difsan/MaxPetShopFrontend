import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductServiceService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{
  p: number = 0;
  l_products: Product[] = [];
  total: number = this.l_products.length;

  constructor(private productService: ProductServiceService){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.l_products = products;
        this.total = this.l_products.length;
      },
      error: (console.log),
      complete: (console.log)
    });
  }

}
