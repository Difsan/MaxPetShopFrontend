import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Cart } from 'src/app/models/cart.model'
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserServiceService } from 'src/app/services/user-service/user.service';
import { CartService } from 'src/app/services/cart-service/cart.service';

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
    private cartService: CartService,
    private router: Router

  ){

    this.userForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null)
    });
  }
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  ngOnSubmit(): void{
    /*this.registerForm = this.builder.group({
      email: this.userForm.get("email")?.value,
      password: this.userForm.get("password")?.value
    });*/
    
    this.authService.register({email: this.userForm.get("email")?.value, 
    password: this.userForm.get("password")?.value})
    .then(response => {
      //console.log(response);
      this.ngSaveUser();
      this.router.navigate(['/users/login']);

    })
    .catch(error => console.log(error));
  }

  ngSaveUser(): void{
    this.userService.saveUser(this.userForm.value).subscribe(
      (answer) => {
        alert("User was added successfully");
        //console.log(answer);
        this.user = answer;
        //console.log(this.user);
        this.ngUpdateUser();        
      },
      (Error) => {
        console.error('error caught in component' + Error);
      }
    )
  }

  ngUpdateUser(): void{
    this.cartService.saveCart({}).subscribe(
      (answer) => {
        //console.log("Entro al save cart");
        //console.log(answer);
        if (this.user!=undefined){
          this.user.cart = answer;
          //console.log(this.user);
          this.userService.updateUser(this.user.id, this.user).subscribe(
            (answer) => {
              //console.log("cart updated inside user");
              //console.log(answer);
            },
            (Error) => {
              //console.error('error caught in component' + Error);
            }
          );
        }        
    }, 
    (Error) => {
      console.error('error caught in component' + Error);
    }
    );
  }
}
