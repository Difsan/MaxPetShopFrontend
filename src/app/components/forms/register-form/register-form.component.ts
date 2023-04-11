import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Cart } from 'src/app/models/cart.model'
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserServiceService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{
  //registerForm:  FormGroup = new FormGroup({});
  userForm: FormGroup;
  //builder: any;
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserServiceService,
    private router: Router

  ){
    /*this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    });*/

    this.userForm = new FormGroup({
      idDTO: new FormControl(null),
      nameDTO: new FormControl(null),
      lastNameDTO: new FormControl(null),
      emailDTO: new FormControl(null, [Validators.required, Validators.email]),
      passwordDTO: new FormControl(null)
    });
  }
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnSubmit(): void{
    /*this.registerForm = this.builder.group({
      email: this.userForm.get("email")?.value,
      password: this.userForm.get("password")?.value
    });*/
    
    this.authService.register({email: this.userForm.get("emailDTO")?.value, 
    password: this.userForm.get("passwordDTO")?.value})
    .then(response => {
      console.log(response);
      this.ngSaveUser();
      this.router.navigate(['/users/login']);

    })
    .catch(error => console.log(error));
  }

  ngSaveUser(): void{
    this.userService.saveUser(this.userForm.value).subscribe(
      (answer) => {
        alert("User was added successfully");
        console.log(answer);
      }
    )
  }
}
