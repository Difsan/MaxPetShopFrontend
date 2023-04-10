import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsComponent } from './forms/forms.component';
import { CardsComponent } from './cards/cards.component';
import { ListsComponent } from './lists/lists.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductCardComponent } from './cards/product-card/product-card.component';
import { ReceiptCardComponent } from './components/cards/receipt-card/receipt-card.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { ProductListComponent } from './components/lists/product-list/product-list.component';
import { ReceiptListComponent } from './components/lists/receipt-list/receipt-list.component';
import { ItemListComponent } from './components/lists/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    CardsComponent,
    ListsComponent,
    FooterComponent,
    HeaderComponent,
    ProductCardComponent,
    ReceiptCardComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProductListComponent,
    ReceiptListComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
