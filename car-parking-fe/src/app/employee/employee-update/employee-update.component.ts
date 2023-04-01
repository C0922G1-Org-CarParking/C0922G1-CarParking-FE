import {Component, OnInit} from '@angular/core';
import {IPosition} from '../../model/iposition';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../service/employee.service';
import {PositionService} from '../../service/position.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../model/employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  position: IPosition[] = [];
  employee: Employee;

  employeeGroup: FormGroup = new FormGroup({
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
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      // tslint:disable-next-line:no-shadowed-variable radix
      employeeService.findById(parseInt(id)).subscribe(next => {
        this.employee = next;
        this.employeeGroup.patchValue(next);
      });
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.employeeGroup.valid) {
      this.employeeService.edit(this.employeeGroup.value).subscribe(next => {
        alert('ha');
        this.router.navigateByUrl('employee/list');
      });
    }
  }

  compare(s1: any, s2: any) {
    return s1 && s2 ? s1.id === s2.id : s1 === s2;
  }


}
