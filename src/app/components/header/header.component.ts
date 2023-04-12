import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchingBy: string = '';
  p: number = 0;
  @Input() typeSearch: string = "";

  // to clean the search input and select.
  @ViewChild('searchInput', {static:false}) searchInput: ElementRef | undefined;
  @ViewChild('searchSelect', {static:false}) searchSelect: ElementRef | undefined;
  
  
  isAuth: boolean;

  constructor(
    private authService: AuthService,
    private variablesService: SharedVariablesService,
    private router: Router
  ) { 
    this.isAuth = this.variablesService.isAuth;
    //to suscribe to the change of the service variable
    variablesService.isAuthChanged.subscribe((newValue: boolean) =>{
      this.isAuth = newValue;
    })
   }

  

  ngOnInit(): void {
    console.log("variable in header " + this.variablesService.isAuth);
    console.log("variable userId in header " + this.variablesService.userId);
    console.log(this.isAuth);
    if(this.searchInput && this.searchSelect){
      this.searchInput.nativeElement.value = '';
      this.searchSelect.nativeElement.value = '';
    }
    
  }

  onClick() {
    this.authService.logOut().then(() => {
      this.variablesService.setIsAuth(false);
      this.variablesService.userId= undefined;
      this.router.navigate(['/home']);
    }).catch(error => console.log(error));
    this.ngOnInit();
  }

  filterProducts(input: string, type: string): void {
    if (input == "" || type === "Select an option") this.ngOnInit();
    switch (type) {
      case "name":
        this.router.navigate(['products/byName'], {
          queryParams: {
            data: JSON.stringify({ input, type })
          }
        });
        this.ngOnInit();
        break;
      case "category":
        this.router.navigate(['products/byCategory'], {
          queryParams: {
            data: JSON.stringify({ input, type })
          }
        });
        this.ngOnInit();
        break;
    }
  }
}
