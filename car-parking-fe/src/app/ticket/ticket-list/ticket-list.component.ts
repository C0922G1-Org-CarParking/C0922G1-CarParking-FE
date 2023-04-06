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
  public currentPage = 0;
  public totalPage = 0;
  public pageNumbers: number[] = [];

  constructor(private ticketService: TicketService) {
  }

  ngOnInit(): void {
    this.findAllTicketType()
  }

  findAllTicketType() {
    this.ticketService.findAllTicketType().subscribe((ticketTypeList) => {
      this.ticketTypeList = ticketTypeList;
      this.findAllFloor()
      this.isServerOnline = true;

    }, error => {
      this.isServerOnline = false;

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

  setStatusFindAll() {
    this.isSearchExpired = false;
    this.isSearchTicket = false;
    this.resetForm();
    this.setValueSearch();
  }

  setValueSearch() {
    this.currentPage = 0;
    if (this.isSearchTicket) {
      this.statusSearch = this.formSearchTicket?.value?.status;
      this.setOtherValuesSearch();
    } else if (this.isSearchExpired) {
      this.statusSearch = 3;
      this.setOtherValuesSearch();
    } else {
      this.statusSearch = '';
      this.setOtherValuesSearch();
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
    this.getListTicket();
  }

  findAllFloor() {
    this.ticketService.findAllFloor().subscribe((floorList) => {
      this.floorList = floorList;
      this.getListTicket();
    })
  }

  getListTicket(page?: number) {
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
      this.currentPage).subscribe((ticketPage) => {
      if (ticketPage == null) {
        Swal.fire({
          icon: 'error',
          title: 'Thông báo',
          text: 'Không tìm thấy dữ liệu!',
          footer: '<a href="">Xóa thất bại</a>'
        })
      }
      this.ticketPage = ticketPage;
      this.ticketList = this.ticketPage.content;
      this.totalPage = this.ticketPage.totalPages;
      this.pageNumbers = Array.from({length: this.totalPage}, (v, k) => k + 1);
      if (!this.isSearchExpired || this.isSearchTicket) {
        this.initForm();
      }
    });
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

  setPageNumber(page?: number) {
    if (!(page === 0) && !(page === undefined)) {
      this.ticketPageNumber = page;

    } else {
      this.ticketPageNumber = 0;

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
        title: 'Xóa thành công',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Không thể xóa!',
        footer: '<a href=""></a>'
      })
    });
  }

  private resetForm() {
    this.formSearchTicket = new FormGroup({
      customerName: new FormControl(''),
      customerPhone: new FormControl(''),
      employeeName: new FormControl(''),
      employeePhone: new FormControl(''),
      floor: new FormControl(''),
      expiryDate: new FormControl(''),
      ticketType: new FormControl(''),
      status: new FormControl('')
    });
  }

  get pageNumbersToDisplay() {
    const currentPageIndex = this.currentPage;
    const totalPageCount = this.totalPage;
    const pagesToShow = 3;

    if (totalPageCount <= pagesToShow) {
      return Array.from({length: totalPageCount}, (_, i) => i + 1);
    }

    const startPage = Math.max(0, currentPageIndex - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage >= totalPageCount) {
      endPage = totalPageCount - 1;
    }

    let pageNumbersToDisplay: (number | string)[] = Array.from({length: endPage - startPage + 1}, (_, i) => i + startPage + 1);

    if (startPage > 0) {
      pageNumbersToDisplay = ['...', ...pageNumbersToDisplay];
    }

    if (endPage < totalPageCount - 1) {
      pageNumbersToDisplay = [...pageNumbersToDisplay, '...'];
    }

    return pageNumbersToDisplay;
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.getListTicket(this.currentPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPage - 1) {
      this.currentPage++;
    }
    this.getListTicket(this.currentPage);
  }

  goToPage(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.currentPage = pageNumber - 1;
    }
    this.getListTicket(this.currentPage);
  }
}
