import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireStorageModule} from '@angular/fire/storage';

import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';

import {AngularFireModule} from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {TicketModule} from "./ticket/ticket.module";
import {AuthInterceptor} from "./security-authentication/security-auth/auth.interceptor";
import { LandingPageComponent } from './landing-page/landing-page.component'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LandingPageComponent,
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
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
