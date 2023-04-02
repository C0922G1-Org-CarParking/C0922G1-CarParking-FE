import {Component, OnInit} from '@angular/core';
import {IPosition} from '../../model/iposition';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from 'src/app/service/employee.service';
import {PositionService} from '../../service/position.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {


  position: IPosition[] = [];

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
  clickButton = false;
  provinceList: any;
  districtList: any;
  communeList: any;
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
    });
  }

  getCommune(value: string) {
    console.log(value);
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private  positionService: PositionService) {

    this.positionService?.getAllPosition().subscribe(next => {
      this.position = next;
    });
  }


  ngOnInit(): void {
    this.refresh();
    this.employeeService.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
  });
  }


  submit() {
    if (this.employeeGroup.valid) {
      this.employeeService?.addEmployee(this.employeeGroup.value).subscribe(next => {
        this.router.navigateByUrl('/employee/list');
        // alert(' thành công');
        // Swal.fire('Thêm mới thành công',
        //   '',
        //   'success');
        Swal.fire(
          'Added!',
          'Your file has been added.',
          'success'
        );
      });
    }
    this.clickButton = true;
  }


  cancel() {
    this.router.navigateByUrl('/employee/list');
  }

  refresh() {
    this.employeeGroup.reset();
  }
}
