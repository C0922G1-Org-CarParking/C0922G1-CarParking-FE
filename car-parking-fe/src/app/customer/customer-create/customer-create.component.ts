import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../model/car';
import {CarType} from '../../model/car-type';
import {CustomerService} from 'src/app/service/customer.service';
import {CarTypeService} from '../../service/car-type.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm: FormGroup;
  carForm: FormGroup;
  cars: Car[] = [];
  carTypeList: CarType[];
  provinceList: string;
  districtList: string;
  communeList: string;
  valueProvince: string = '';
  valueDistrict: string = '';

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private carTypeService: CarTypeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.customerForm = this.fb?.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      idCard: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      isGender: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      commune: ['', Validators.required],
      street: ['', Validators.required],
      isDelete: ['', Validators.required],
    });
    this.carTypeService.getAllCarType().subscribe(next => {
      this.carTypeList = next;
    });

    this.carForm = this.fb?.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      plateNumber: ['', Validators.required],
      carType: ['', Validators.required],
      customer: this.customerForm,
      brand: ['', Validators.required],
      isDelete: ['', Validators.required],

    });

    this.customerService?.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
    });
  }

  onSubmit() {
    this.customerService?.createCustomer(this.customerForm.value, this.cars).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/customer/list');
        Swal.fire('Thêm mới khách hàng thành công.', '', 'success');
      },
      error => {
        alert('lỗi');
      }
    );
  }

  addCar() {
    this.cars.push(this.carForm.value);
    this.carForm = this.fb?.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      plateNumber: ['', Validators.required],
      carType: ['', Validators.required],
      customer: this.customerForm,
      brand: ['', Validators.required],
      isDelete: ['', Validators.required],
    });
  }

  getProvince(value: string) {
    this.valueProvince = value;
    this.customerService.getAllDistrict(parseInt(value)).subscribe(next => {
      this.districtList = next.data.data;
    });
  }

  getDistrict(value: string) {
    this.valueDistrict = value;
    if (this.valueProvince === '') {
      Swal.fire('Bạn phải chọn Tỉnh.', '', 'error');
    }
    this.customerService.getAllCommune(parseInt(value)).subscribe(next => {
      this.communeList = next.data.data;
    });
  }

  getCommune(value: string) {
    if (this.valueDistrict === '') {
      Swal.fire('Bạn phải chọn Quận/Huyện.', '', 'error');
    }
  }
}
