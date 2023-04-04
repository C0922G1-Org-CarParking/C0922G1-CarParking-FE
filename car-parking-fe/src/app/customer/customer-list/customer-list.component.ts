import {Component, OnInit} from '@angular/core';
import {Customer} from '../../model/customer';
import {CustomerService} from '../../service/customer.service';
// @ts-ignore
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  idDelete: number;
  nameDelete: string;
  customers: Customer[];
  name = '';
  idCard = '';
  phoneNumber = '';
  starDate = '';
  endDate = '';
  page = 0;
  pageSize = 5;
  pageCount = 0;
  pageNumbers: number[] = [];
  color = 'yellow';
  message: string;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  onSearch(name: string, idCard: string, phoneNumber: string, starDate: string, endDate: string) {
    this.name = name;
    this.idCard = idCard;
    this.phoneNumber = phoneNumber;
    this.starDate = starDate;
    this.endDate = endDate;
    this.customerService.getAll(this.name, this.idCard, this.phoneNumber, this.starDate, this.endDate, this.page, this.pageSize)
      .subscribe(customeres => {
      }, error => {
        Swal.fire('Dữ liệu bạn vừa nhập không khớp trong cơ sử dữ liệu!', '', 'error');
      });
    this.getAll();
  }

  getAll() {
    this.customerService.getAll(this.name, this.idCard, this.phoneNumber, this.starDate, this.endDate, this.page, this.pageSize)
      .subscribe(customeres => {
        this.customers = customeres.content;
        this.pageCount = customeres.totalPages;
        this.pageNumbers = Array.from({length: this.pageCount}, (v, k) => k + 1);
        this.message = null;
      });
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getAll();
    }
  }

  nextPage() {
    if (this.page < (this.pageCount - 1)) {
      this.page++;
      this.getAll();
    }
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getAll();
  }

  delete(id: number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;
  }

  deletes(idDelete: number) {
    this.message = null;
    this.customerService.deleteCustomer(idDelete).subscribe(() => {
      Swal.fire('Xóa khách hàng thành công', '', 'success');
      this.getAll();
    }, error => {
      if (error.status === 404) {
        Swal.fire('Xóa khách hàng không thành công, khách hàng đã bị xóa hoặc không tồn tại trong cơ sở dữ liệu', '', 'success');
      } else if (error.status === 405) {
        Swal.fire('Xóa không thành công, Khách hàng hiện tại vẫn còn thời hạn vé. Chờ xác nhận mail từ khách hàng', '', 'error');
        this.customerService.sendEmail('duyhuynhzi767@gmail.com', idDelete).subscribe();
      } else {
        Swal.fire('Lỗi kết nối', '', 'error');
      }
    });
  }

  backList(nameInput: HTMLInputElement, idCardInput: HTMLInputElement, phoneNumberInput: HTMLInputElement, starDateInput: HTMLInputElement, endDateInput: HTMLInputElement) {
    nameInput.value = '';
    idCardInput.value = '';
    phoneNumberInput.value = '';
    starDateInput.value = '';
    endDateInput.value = '';
    this.name = '';
    this.idCard = '';
    this.phoneNumber = '';
    this.starDate = '';
    this.endDate = '';
    this.getAll();
  }
}
