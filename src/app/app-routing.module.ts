import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./components/forms/login-form/login-form.component";
import { Component, NgModule } from "@angular/core";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page/welcome-page.component";
import { ProductPageComponent } from "./pages/product-page/product-page/product-page.component";
import { ReceiptPageComponent } from "./pages/receipt-page/receipt-page/receipt-page.component";
import { CartPageComponent } from "./pages/cart-page/cart-page/cart-page.component";
import { UserPageComponent } from "./pages/user-page/user-page/user-page.component";
import { RegisterFormComponent } from "./components/forms/register-form/register-form.component";
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { HomePageComponent } from "./pages/home-page/home-page/home-page.component";
import { AppComponent } from "./app.component";
import { ReceiptFormComponent } from "./components/forms/receipt-form/receipt-form.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        component: WelcomePageComponent
    },
    {
        path: 'products',
        component: ProductPageComponent
    },
    {
        path: 'products/byAnimalType',
        component: ProductPageComponent
    },
    {
        path: 'products/byCategory',
        component: ProductPageComponent
    },
    {
        path: 'products/byName',
        component: ProductPageComponent
    },
    {
        path: 'receipts',
        component: ReceiptPageComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/users/login']))
    },
    {
        path: 'carts',
        component: CartPageComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/users/login']))
    },
    {
        path: 'carts/removeItem',
        component: CartPageComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/users/login']))
    },
    {
        path: 'users',
        component: UserPageComponent
    },

    {
        path: 'users',

        children: [
            {
                path: 'login',
                component: LoginFormComponent},
            {
                path: 'register',
                component: RegisterFormComponent
            },
            
        ]
    },
    {
        path: 'receipts',

        children: [
            {
                path:'create',
                component: ReceiptFormComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }