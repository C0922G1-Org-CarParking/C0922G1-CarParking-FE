import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestFormRoutingModule } from './test-form-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    TestFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class TestFormModule { }
