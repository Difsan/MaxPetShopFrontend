import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginFrom: FormGroup;

  constructor(
    private authService: AuthService,
    private variablesService: SharedVariablesService,
    private router: Router

  ) {
    this.loginFrom = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    this.authService.login(this.loginFrom.value)
      .then(response => {
        console.log(response);
        this.variablesService.setIsAuth(true);
        console.log(this.variablesService.isAuth);
        this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }



}
