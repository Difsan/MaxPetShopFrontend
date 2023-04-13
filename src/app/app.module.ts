import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/cards/product-card/product-card.component';
import { ReceiptCardComponent } from './components/cards/receipt-card/receipt-card.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ProductListComponent } from './components/lists/product-list/product-list.component';
import { ReceiptListComponent } from './components/lists/receipt-list/receipt-list.component';
import { ItemListComponent } from './components/lists/item-list/item-list.component';
import { CartPageComponent } from './pages/cart-page/cart-page/cart-page.component';
import { ProductPageComponent } from './pages/product-page/product-page/product-page.component';
import { ReceiptPageComponent } from './pages/receipt-page/receipt-page/receipt-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page/welcome-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page/user-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemCardComponent } from './components/cards/item-card/item-card.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProductCardComponent,
    ReceiptCardComponent,
    ItemListComponent,
    ProductListComponent,
    ReceiptListComponent,
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ReceiptCardComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProductListComponent,
    ReceiptListComponent,
    ItemListComponent,
    CartPageComponent,
    ProductPageComponent,
    ReceiptPageComponent,
    WelcomePageComponent,
    HomePageComponent,
    UserPageComponent,
    ItemCardComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, 
    MaterialModule,
    MatTableModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
