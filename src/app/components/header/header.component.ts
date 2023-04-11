import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onClick(){
    this.authService.logOut().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => console.log(error));
  }
}
