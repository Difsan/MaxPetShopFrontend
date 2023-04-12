import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  
  constructor(private router: Router,
    private variableService: SharedVariablesService) {
    
  }

  goToProductList(animalType: string): void{
    this.variableService.choseAnimalType='';
    this.router.navigate(['products/byAnimalType'],{
      queryParams:{
        data: JSON.stringify(animalType)
      }
    });
  }
}
