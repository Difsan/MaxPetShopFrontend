import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  loginFrom: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router

  ){
    this.loginFrom = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    })
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void{
    this.authService.login(this.loginFrom.value)
    .then(response => {
      console.log(response);
      //add router to send us to login
      this.router.navigate(['/products']);

    })
    .catch(error => console.log(error));
  }
  
 
  
}
