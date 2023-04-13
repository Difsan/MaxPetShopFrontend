import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { SharedVariablesService } from 'src/app/services/shared-variables-service/shared-variables.service';
import { UserServiceService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginFrom: FormGroup;
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserServiceService,
    private variablesService: SharedVariablesService,
    private router: Router

  ) {
    this.loginFrom = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    })
  }

  ngOnInit(): void {
    console.log(this.variablesService.userId);
  }

  onSubmit(): void {
    this.authService.login(this.loginFrom.value)
      .then(response => {
        console.log(response);
        this.variablesService.setIsAuth(true);
        console.log(this.variablesService.isAuth);
        this.ngGetUserByEmail(this.loginFrom.get('email')?.value);
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
        //alert(error);
      });
  }

  ngGetUserByEmail(email: string): void {
    this.userService.getUserByEmail(email).subscribe((answer) => {
      console.log(answer);
      this.user = answer;
      this.variablesService.user = this.user;
      console.log(this.user);
      console.log(this.variablesService.userId);
      this.variablesService.userId = this.user?.id;
      console.log(this.variablesService.userId);
    },
    (Error) => {
        console.error('error caught in component' + Error);
      })

  }



}
