import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';




import {environment} from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {TicketModule} from "./ticket/ticket.module";


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
