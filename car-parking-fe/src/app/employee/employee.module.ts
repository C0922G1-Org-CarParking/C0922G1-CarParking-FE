import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [EmployeeListComponent, EmployeeCreateComponent, EmployeeUpdateComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class EmployeeModule {
}
