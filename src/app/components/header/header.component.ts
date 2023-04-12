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
  
  isAuth: boolean = this.variablesService.isAuth;

  constructor(
    private authService: AuthService,
    private variablesService: SharedVariablesService,
    private router: Router
  ) { }

  

  ngOnInit(): void {
    if(this.searchInput && this.searchSelect){
      this.searchInput.nativeElement.value = '';
      this.searchSelect.nativeElement.value = '';
    }
    
  }

  onClick() {
    this.authService.logOut().then(() => {
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
