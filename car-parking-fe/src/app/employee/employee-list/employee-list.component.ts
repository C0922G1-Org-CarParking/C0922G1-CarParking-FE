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
  message: '';
  size = 5;
  province: any;
  district: any;
  commune: any;


  constructor(private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getAll();
    this.employeeService.getAllProvince().subscribe(next => {
      // tslint:disable-next-line:radix
      this.province = next.data.data.filter(n => n.code === parseInt(this.employee.province))[0].name;

      // tslint:disable-next-line:radix no-shadowed-variable
      this.employeeService.getAllDistrict(parseInt(this.employee.province)).subscribe(next => {
        // tslint:disable-next-line:radix
        this.district = next.data.data.filter(n => n.code === parseInt(this.employee.district))[0].name;
      });
      // tslint:disable-next-line:radix no-shadowed-variable
      this.employeeService.getAllCommune(parseInt(this.employee.district)).subscribe(next => {
        // tslint:disable-next-line:radix
        this.commune = next.data.data.filter(n => n.code === parseInt(this.employee.commune))[0].name;
      });
    });
  }

  getAll() {
    this.message = null;
    this.employeeService.getAllEmployee(this.currentPage, this.size,
      this.nameSearch,
      this.startDate,
      this.endDate).subscribe(data => {
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


}
