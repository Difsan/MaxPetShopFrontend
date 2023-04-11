import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router

  ){
    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    })
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void{
    this.authService.register(this.registerForm.value)
    .then(response => {
      console.log(response);
      //add router to send us to login
      this.router.navigate(['/users/login']);

    })
    .catch(error => console.log(error));
  }
}
