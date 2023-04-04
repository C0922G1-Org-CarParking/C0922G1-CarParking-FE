import {Component, OnInit} from '@angular/core';
import {IPosition} from '../../model/iposition';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../model/employee';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  position: IPosition[] = [];
  employee: Employee;
  errors = {
    name: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    idCard: '',
    province: '',
    district: '',
    commune: '',
    street: '',
    phoneNumber: '',
  };
  employeeGroup: FormGroup = new FormGroup({

    id: new FormControl(),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ỹ\s]*$/)]),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    idCard: new FormControl('', [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
    position: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    commune: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(0|\\+84)\\d{9}$')])
  });
  provinceList: any;
  districtList: any;
  communeList: any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private  positionService: PositionService) {
    this.positionService.getAllPosition().subscribe(next => {
      this.position = next;
    });
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      // tslint:disable-next-line:no-shadowed-variable radix
      employeeService.findById(parseInt(id)).subscribe(next => {
        this.employee = next;
        this.employeeGroup.patchValue(next);
      });
    });
  }

  getProvince(value: string) {
    console.log(value);
    // tslint:disable-next-line:radix
    parseInt(value);
    // tslint:disable-next-line:radix
    this.employeeService.getAllDistrict(parseInt(value)).subscribe(next => {
      this.districtList = next.data.data;
    });
  }

  getDistrict(value: string) {
    console.log(value);
    // tslint:disable-next-line:radix
    this.employeeService.getAllCommune(parseInt(value)).subscribe(next => {

        this.communeList = next.data.data;
      }
    );
  }

  getCommune(value: string) {
    console.log(value);
  }


  ngOnInit(): void {
    this.employeeService.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
    });
  }

  submitUpdate() {
    if (this.employeeGroup.valid) {
      this.employeeService.editEmployee(this.employeeGroup.value).subscribe(next => {
        this.router.navigateByUrl('employee/list');
        Swal.fire(
          'Updated!',
          'Your file has been updated.',
          'success'
        );
      }, error => {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Chỉnh sửa!',
            text: 'Chỉnh sửa thất bại vui lòng điền đúng tất cả thông tin',
            showConfirmButton: false,
            timer: 2000
          });
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < error.error.length; i++) {
            if (error.error && error.error[i].field === 'email') {
              this.errors.email = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'phoneNumber') {
              this.errors.phoneNumber = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'idCard') {
              this.errors.idCard = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'name') {
              this.errors.name = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'dateOfBirth') {
              this.errors.dateOfBirth = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'province') {
              this.errors.province = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'district') {
              this.errors.district = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'commune') {
              this.errors.commune = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'street') {
              this.errors.street = error.error[i].defaultMessage;
            }
            if (error.error && error.error[i].field === 'phoneNumber') {
              this.errors.phoneNumber = error.error[i].defaultMessage;
            }
          }
        }
      );
    }
  }

  compare(s1: any, s2: any) {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }

  cancel() {
    this.router.navigateByUrl('/employee/list');
  }
}
