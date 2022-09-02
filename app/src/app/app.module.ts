import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {currencyRepository} from "./repositories/currencyRepository";
import { CurrencyInputComponent } from './currency-input/currency-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyInputComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
  ],
  providers: [currencyRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
