import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityAuthenticationRoutingModule } from './security-authentication-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecurityAuthenticationRoutingModule,
    ReactiveFormsModule
  ]
})
export class SecurityAuthenticationModule { }
