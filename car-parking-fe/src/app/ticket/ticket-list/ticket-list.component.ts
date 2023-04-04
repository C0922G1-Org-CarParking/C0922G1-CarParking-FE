import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {TicketType} from "../../model/ticket-type";
import {Floor} from "../../model/floor";
import {FormControl, FormGroup} from "@angular/forms";
import {TicketDtoForList} from "../../model/ticket-dto-for-list";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  private customerNameSearch;
  private customerPhoneSearch;
  private employeeNameSearch;
  private employeePhoneSearch;
  private floorSearch;
  private expiryDateSearch;
  private ticketTypeSearch;
  private statusSearch;
  public formSearchTicket: FormGroup;
  private ticketPage: any;
  public ticketTypeList: TicketType[];
  public floorList: Floor[];
  public ticketList: TicketDtoForList[];
  public ticketPageNumber: number = 0;
  public isServerOnline: boolean = false;
  public idDelete: number;
  public nameCustomerDelete: string;
  public plateNumberDelete: string;
  public expiryDateDelete: string;
  public isTicketExpired: boolean = false;
  private isSearchTicket: boolean = false;
  private isSearchExpired: boolean;
  private totalPage: number;
  public hasPrevious: boolean = false;
  private hasNext: boolean;
  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.findAllTicketType()
  }

  initForm() {
    this.formSearchTicket = new FormGroup({
      customerName: new FormControl(this.customerNameSearch),
      customerPhone: new FormControl(this.customerPhoneSearch),
      employeeName: new FormControl(this.employeeNameSearch),
      employeePhone: new FormControl(this.employeePhoneSearch),
      floor: new FormControl(this.floorSearch),
      expiryDate: new FormControl(this.expiryDateSearch),
      ticketType: new FormControl(this.ticketTypeSearch),
      status: new FormControl(this.statusSearch)
    });
  }

  findAllTicketType() {
    this.ticketService.findAllTicketType().subscribe((ticketTypeList) => {
      this.ticketTypeList = ticketTypeList;
      this.findAllFloor()
      this.isServerOnline = true;
      debugger
    }, error => {
      this.isServerOnline = false;
      debugger
    })
  }

  setStatusSearch() {
    this.isSearchExpired = false;
    this.isSearchTicket = true;
    this.setValueSearch();
  }

  setStatusSearchAllExpired() {
    this.isSearchExpired = true;
    this.isSearchTicket = false;
    this.setValueSearch();
  }

  setStatusSearchAllDefault() {
    this.isSearchExpired = false;
    this.isSearchTicket = false;
    this.setValueSearch();
  }

  setValueSearch() {
    if (this.isSearchTicket) {
      this.statusSearch = this.formSearchTicket?.value?.status;
      this.setOtherValuesSearch();
    } else {
      if (this.isSearchExpired) {
        this.statusSearch = 3;
        this.setOtherValuesSearch();
      } else {
        this.statusSearch = '';
        this.setOtherValuesSearch();
      }
    }
  }

  setOtherValuesSearch() {
    this.customerNameSearch = this.formSearchTicket?.value?.customerName;
    this.customerPhoneSearch = this.formSearchTicket?.value?.customerPhone;
    this.employeeNameSearch = this.formSearchTicket?.value?.employeeName;
    this.employeePhoneSearch = this.formSearchTicket?.value?.employeePhone;
    this.floorSearch = this.formSearchTicket?.value?.floor;
    this.expiryDateSearch = this.formSearchTicket?.value?.expiryDate;
    this.ticketTypeSearch = this.formSearchTicket?.value?.ticketType;
    debugger
    this.getListTicket();
  }

  findAllFloor() {
    this.ticketService.findAllFloor().subscribe((floorList) => {
      this.floorList = floorList;
      this.getListTicket();
    })
  }

  getListTicket(page?: number) {
    this.hasNext = true;
    this.hasPrevious = true;
    if (this.ticketPageNumber >= this.totalPage) {
      this.hasNext = false;
    }
    if (this.ticketPageNumber <= 0) {
      this.hasPrevious = false;
    }
    this.setPageNumber(page);
    this.ticketService.searchTicket(
      this.customerNameSearch,
      this.customerPhoneSearch,
      this.employeeNameSearch,
      this.employeePhoneSearch,
      this.floorSearch,
      this.expiryDateSearch,
      this.ticketTypeSearch,
      this.statusSearch,
      this.ticketPageNumber).subscribe((ticketPage) => {
      this.ticketPage = ticketPage;
      debugger
      this.ticketList = this.ticketPage.content;
      this.initForm();
    });
    debugger
  }
  setPageNumber(page?: number) {
    if (!(page === 0) && !(page === undefined)) {
      this.ticketPageNumber = page;
      debugger
    } else {
      this.ticketPageNumber = 0;
      debugger
    }
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

  checkTicketExpiry() {
    this.ticketService.findById(this.idDelete).subscribe((ticketDelete) => {
       let currentDate = new Date();
       let expiryDate = new Date(ticketDelete.expiryDate);
       this.isTicketExpired = expiryDate < currentDate;
    })
  }

  delete() {
    this.ticketService.deleteTicket(this.idDelete).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Xóa thất bại</a>'
      })
    });
  }

}
