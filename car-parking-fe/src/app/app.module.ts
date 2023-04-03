
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageContentComponent } from './home-page/home-page-content.component';
import {TicketModule} from "./ticket/ticket.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomePageContentComponent,

    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TicketModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
