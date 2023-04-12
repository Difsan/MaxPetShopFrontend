import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  searchingBy: string = '';
  p: number = 0;
  @Input() typeSearch: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onClick(){
    this.authService.logOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => console.log(error));
  }

  filterProducts(input: string, type: string): void{
    if (input == "" || type === "Select an option") this.ngOnInit();
    switch(type){
      case "name":
        this.router.navigate(['products/byName'],{
      queryParams:{
        data: JSON.stringify({input, type})
      }});
        break;
      case "category":
        this.router.navigate(['products/byCategory'],{
      queryParams:{
        data: JSON.stringify({input, type})
      }});
    }
  }
}
