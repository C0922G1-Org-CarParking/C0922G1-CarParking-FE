import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {ActivatedRoute} from "@angular/router";
import {TicketDtoForList} from "../../model/ticket-dto-for-list";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  private idDetail: number;
  public ticketDetail: TicketDtoForList;
  public idDelete: number;
  public nameCustomerDelete: string;
  public plateNumberDelete: string;
  public expiryDateDelete: string;
  public isTicketExpired: boolean = false;
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

  setInfoDelete(idDelete: number,
                nameCustomerDelete: string,
                plateNumberDelete: string,
                expiryDateDelete: string) {
    this.idDelete = idDelete;
    this.nameCustomerDelete = nameCustomerDelete;
    this.plateNumberDelete = plateNumberDelete;
    this.expiryDateDelete = expiryDateDelete;
    this.checkTicketExpiry();
  }

  delete() {
    this.ticketService.deleteTicket(this.idDelete).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Vé của bạn đã được xóa',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error!',
        footer: '<a href="">Xóa thất bại</a>'
      })
    });
  }

  private checkTicketExpiry() {
    this.ticketService.findById(this.idDelete).subscribe((ticketDelete) => {
      let currentDate = new Date();
      let expiryDate = new Date(ticketDelete.expiryDate);
      this.isTicketExpired = expiryDate < currentDate;
    })
  }
}
