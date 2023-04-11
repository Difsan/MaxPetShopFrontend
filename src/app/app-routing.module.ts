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
        path: 'users',
        component: UserPageComponent
    },
    {
        path: 'welcome',
        component: WelcomePageComponent
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }