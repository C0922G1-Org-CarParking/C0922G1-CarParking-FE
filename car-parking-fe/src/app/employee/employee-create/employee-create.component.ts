import {Component, OnInit} from '@angular/core';
import {IPosition} from '../../model/iposition';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from 'src/app/service/employee.service';
import {PositionService} from '../../service/position.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  position: IPosition[] = [];
  employeeGroup: FormGroup = new FormGroup({
    // id: new FormControl(),
    // name: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z]+(?:\\s+[A-Za-z]+)*$')]),
    // dateOfBirth: new FormControl('', [Validators.required,
    //   Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])[\\/\\-](0?[1-9]|1[012])[\\/\\-]\\d{4}$')]),
    // gender: new FormControl('', Validators.required),
    // email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
    // idCard: new FormControl('', [Validators.required, Validators.pattern('(\\d{9})|(\\d{12})')]),
    // position: new FormControl('', Validators.required),
    // province: new FormControl('', Validators.required),
    // district: new FormControl('', Validators.required),
    // commune: new FormControl('', Validators.required),
    // street: new FormControl('', Validators.required),
    // phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(0|\\+84)\\d{9}$')]),

    id: new FormControl(),
    name: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    idCard: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    province: new FormControl(),
    district: new FormControl(),
    commune: new FormControl(),
    street: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),

  });


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private  positionService: PositionService) {

    this.positionService.getAllPosition().subscribe(next => {
      this.position = next;
    });
  }



  ngOnInit(): void {
    this.refresh();
  }


  submit() {
    if (this.employeeGroup.valid) {
      this.employeeService.addEmployee(this.employeeGroup.value).subscribe(next => {
        this.router.navigateByUrl('/employee/list');

        alert('thành công');

      });
    } else {
      alert('thất bại');
    }
  }


  cancel() {
    this.router.navigateByUrl('/employee/list');
  }

  refresh() {
    this.employeeGroup.reset();
  }
}
