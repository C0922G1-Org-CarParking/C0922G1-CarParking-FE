import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../service/employee.service';
import {Employee} from '../../model/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  totalPages = 0;
  // số trang hiện tại
  currentPage = 0;
  employees: Employee[] = [];
  employee: any;
  nameSearch: string;
  // @ts-ignore
  employeeDelete: Employee = {};
  pageNumber: number[] = [];
  startDate: string;
  endDate: string;
  street: string;
  message: '';
  size = 10;
  province: any;
  provinceList: any;


  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getAll();
    this.employeeService.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
    });
  }

  getAll() {
    this.message = null;
    this.employeeService.getAllEmployee(this.currentPage, this.size,
      this.nameSearch, this.startDate, this.endDate, this.street).subscribe(data => {
      this.employee = data;
      this.employees = this.employee.content;
      this.totalPages = this.employee.totalPages;
      this.pageNumber = Array.from({length: this.totalPages}, (v, k) => k + 1);
    }, error => {
      this.message = error.error;
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
      });
    }
  }

  previous() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAll();
    }
  }

  next() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAll();
    }
  }

  numberPage(page: number) {
    this.currentPage = page - 1;
    this.getAll();
  }

  getProvince(value: string) {
    console.log(value);
    // tslint:disable-next-line:radix
    parseInt(value);
  }
}
