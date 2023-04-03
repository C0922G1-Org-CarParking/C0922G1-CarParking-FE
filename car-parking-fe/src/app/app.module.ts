import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageContentComponent } from './home-page/home-page-content.component';
import {TicketModule} from "./ticket/ticket.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomePageContentComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    TicketModule
=======
    ReactiveFormsModule,
    FormsModule,
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
