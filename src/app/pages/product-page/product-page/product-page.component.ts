import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductServiceService } from 'src/app/services/product-service/product.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  p: number = 0;
  l_products: Product[] = [];
  total: number = this.l_products.length;
  //choseAnimalType: string = '';
  //choseAnimalType2: string = '';
  choseInput: string = '';
  choseType: string = '';

  constructor(private productService: ProductServiceService,
    private variableService: SharedVariablesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((info) => {
      if ((JSON.stringify(info) !== JSON.stringify({})&&
      JSON.parse(info['data']) === "dog" || "cat") && this.variableService.choseAnimalType === '') {
        this.variableService.choseAnimalType = JSON.parse(info['data']);
        this.productService.getProductByAnimalType(this.variableService.choseAnimalType)
          .subscribe({
            next: (products) => {
              this.l_products = products;
              console.log(this.l_products);
              this.total = this.l_products.length;
            },
            error: (console.log),
            complete: (console.log)
          });
      }
      if (JSON.parse(info['data']).type === "category") {
        this.choseInput = JSON.parse(info['data']).input;
        this.ngProductsByCategory(this.choseInput, this.variableService.choseAnimalType);
      } 
      if(JSON.parse(info['data']).type === "name") {
        this.choseInput = JSON.parse(info['data']).input;
        console.log(this.variableService.choseAnimalType);
        this.ngProductsByName(this.choseInput, this.variableService.choseAnimalType);

      }

    })


  }

  ngProductsByCategory(category: string, animaltype: string): void {
    console.log(animaltype);
    this.productService.getProductByCategory(category, animaltype)
      .subscribe({
        next: (products) => {
          this.l_products = products;
          console.log(this.l_products);
          this.total = this.l_products.length;
          this.variableService.choseAnimalType = '';
        },
        error: (console.log),
        complete: (console.log)
      });
  }

  ngProductsByName(name: string, animaltype: string): void {
    console.log(animaltype);
    this.productService.getProductByName(name, animaltype)
      .subscribe({
        next: (products) => {
          this.l_products = products;

          console.log(this.l_products);
          this.total = this.l_products.length;
          this.variableService.choseAnimalType = '';
        },
        error: (console.log),
        complete: (console.log)
      });
  }

}
