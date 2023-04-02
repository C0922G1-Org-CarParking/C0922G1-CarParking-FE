import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityAuthenticationRoutingModule } from './security-authentication-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SecurityAuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class SecurityAuthenticationModule { }
