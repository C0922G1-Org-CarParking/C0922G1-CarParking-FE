import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [TicketListComponent, TicketCreateComponent, TicketUpdateComponent, TicketDetailComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class TicketModule { }
