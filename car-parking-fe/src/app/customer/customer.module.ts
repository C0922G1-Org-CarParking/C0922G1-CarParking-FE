import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StatusDeleteCustomerComponent} from './status-delete-customer/status-delete-customer.component';

@NgModule({
  declarations: [CustomerListComponent, CustomerUpdateComponent, CustomerInfoComponent, CustomerCreateComponent, StatusDeleteCustomerComponent],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerModule { }
