import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {Ticket} from "../../model/ticket";

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  private ticketList: Ticket[];
  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
  }


}
