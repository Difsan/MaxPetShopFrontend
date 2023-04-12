import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  choseAnimaltye: string= '';

  constructor(private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((info)=>{
      if(JSON.stringify(info) !== JSON.stringify({}) 
      && JSON.parse(info['data']) === "dog" || "cat"){
        this.choseAnimaltye = JSON.parse(info['data'])
        this.productService.getProductByAnimalType(this.choseAnimaltye).subscribe({
          next: (products) => {
            this.l_products = products;
            this.total = this.l_products.length;
          },
          error: (console.log),
          complete: (console.log)
        });
      }
      
    })

    
  }

}
