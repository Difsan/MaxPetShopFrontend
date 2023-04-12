import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  
  constructor(private router: Router) {
    
  }

  goToProductList(animalType: string): void{
    this.router.navigate(['products/byAnimalType'],{
      queryParams:{
        data: JSON.stringify(animalType)
      }
    });
  }
}
