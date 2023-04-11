import { RouterModule, Routes } from "@angular/router";
import { LoginFormComponent } from "./components/forms/login-form/login-form.component";
import { Component, NgModule } from "@angular/core";
import { WelcomePageComponent } from "./pages/welcome-page/welcome-page/welcome-page.component";
import { ProductPageComponent } from "./pages/product-page/product-page/product-page.component";
import { ReceiptPageComponent } from "./pages/receipt-page/receipt-page/receipt-page.component";
import { CartPageComponent } from "./pages/cart-page/cart-page/cart-page.component";
import { UserPageComponent } from "./pages/user-page/user-page/user-page.component";


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
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
        component: ReceiptPageComponent
    },
    {
        path: 'carts',
        component: CartPageComponent
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
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }