import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
<<<<<<< HEAD
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TicketListComponent, TicketCreateComponent, TicketUpdateComponent, TicketDetailComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule
  ]
=======
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [TicketListComponent, TicketCreateComponent, TicketUpdateComponent],
    imports: [
        CommonModule,
        TicketRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee
})
export class TicketModule { }
