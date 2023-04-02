import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {TicketDto} from "../../model/ticket-dto";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  private idDetail: number;
  public ticketDetail: TicketDto;
  constructor(private ticketService: TicketService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.idDetail = +paramMap.get('id');
      this.findById(this.idDetail);
    })
  }

  findById(id: number) {
    this.ticketService.findById(id).subscribe((ticketDetail) => {
      this.ticketDetail = ticketDetail;
      debugger
    });
  }

}
