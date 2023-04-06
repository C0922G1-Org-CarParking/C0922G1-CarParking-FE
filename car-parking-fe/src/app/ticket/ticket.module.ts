import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
<<<<<<< HEAD
import { MyChartComponent } from './my-chart/my-chart.component';
=======
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
>>>>>>> origin/car-in-out


@NgModule({
  declarations: [TicketListComponent, TicketCreateComponent, TicketUpdateComponent, TicketDetailComponent, MyChartComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class TicketModule { }
