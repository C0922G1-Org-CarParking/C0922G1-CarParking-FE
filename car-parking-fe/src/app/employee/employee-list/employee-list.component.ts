import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../model/employee';
import Swal from 'sweetalert2';
import {log} from "util";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  employee: any;
  nameSearch: string;
  // @ts-ignore
  employeeDelete: Employee = {};
  startDate: string;
  endDate: string;
  street: string;
  message: '';
  size = 5;
  province: number = 0;
  provinceList: any;
  pageCount = 0;
  pageNumbers: number[] = [];
  totalPages = 0;gi
  // số trang hiện tại
  currentPage = 0;

  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getAll();
    this.employeeService.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
    });
  }
  getProvince(value: string) {
    console.log(value);
    if (!isNaN(parseInt(value))) {
      this.province = parseInt(value);
    } else {
      this.province = 0;
    }
  }

  search() {
    this.currentPage= 0
    this.message = null;
    this.employeeService.getAllEmployee(this.currentPage, this.size,
      this.nameSearch, this.startDate, this.endDate, this.street, this.province).subscribe(data => {
      this.employee = data;
      this.employees = this.employee.content;
      this.pageCount = this.employee.totalPages;
      this.pageNumbers = Array.from({length: this.pageCount}, (v, k) => k + 1);    }, error => {
      // this.message = error.error;
      Swal.fire(
        'Không tìm thấy dữ liệu!',
        '',
        'error'
      );
    });
  }

  getAll() {
    this.message = null;
    this.employeeService.getAllEmployee(this.currentPage, this.size,
      this.nameSearch, this.startDate, this.endDate, this.street, this.province).subscribe(data => {
      this.employee = data;
      this.employees = this.employee.content;
      this.pageCount = this.employee.totalPages;
      this.pageNumbers = Array.from({length: this.pageCount}, (v, k) => k + 1);    }, error => {
      // this.message = error.error;
      Swal.fire(
        'Không tìm thấy dữ liệu!',
        '',
        'error'
      );
    });
  }

  delete(id: number) {
    if (id != null) {
      return this.employeeService.deleteById(this.employeeDelete.id).subscribe(data => {
        Swal.fire(
          'Xóa nhân viên thành công',
          '',
          'success'
        );
        this.getAll();
      }, error => {
        Swal.fire(
          'Xóa nhân viên không thành công',
          '',
          'error'
        );
      });
    }
  }

  get pageNumbersToDisplay() {
    const currentPageIndex = this.currentPage;
    const totalPageCount = this.pageCount;
    const pagesToShow = 3;

    if (totalPageCount <= pagesToShow) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    const startPage = Math.max(0, currentPageIndex - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage >= totalPageCount) {
      endPage = totalPageCount - 1;
    }

    let pageNumbersToDisplay: (number | string)[] = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage + 1);

    if (startPage > 0) {
      pageNumbersToDisplay = [ '...', ...pageNumbersToDisplay];
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
    this.getAll();
  }

  nextPage() {
    if (this.currentPage < this.pageCount - 1) {
      this.currentPage++;
    }
    this.getAll();
  }

  goToPage(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.currentPage = pageNumber - 1;
    }
    this.getAll();
  }

  clearInputs() {
    this.nameSearch = '';
    this.startDate = '';
    this.endDate = '';
    this.street= '';
    this.province = 0
    this.getAll()
  }

}
