import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Car} from '../../model/car';
import {CarType} from '../../model/car-type';
import {CustomerService} from 'src/app/service/customer.service';
import {CarTypeService} from '../../service/car-type.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

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
  messCustomerName: string;
  messEmail: string;
  messPhoneNumber: string;
  messDateOfBirth: string;
  messCCCD: string;
  messStreet: string;
  messCustomerNamePattern: string;
  messCCCDPattern: string;
  messDateOfBirthPattern: string;
  messEmailPattern: string;
  messPhoneNumberPattern: string;
  messGender: string;

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
      isGender: [true, Validators.required],
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
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      plateNumber: ['', [Validators.required, Validators.pattern('^[A-Z1-9]+$')]],
      carType: ['', Validators.required],
      customer: this.customerForm,
      brand: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      isDelete: ['', Validators.required],
    });

    this.customerService?.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
    });
  }

  onSubmit() {
    this.messCustomerName = "";
    this.messStreet = "";
    this.messCCCD = "";
    this.messDateOfBirth = "";
    this.messEmail = "";
    this.messPhoneNumber = "";
    this.messGender = "";
    this.customerService?.createCustomer(this.customerForm.value, this.cars).subscribe(data => {
        console.log(data)
        Swal.fire('Thêm mới khách hàng thành công.', '', 'success')
        this.router.navigateByUrl("/customer/list")
      },
      error => {
        console.log(error)
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field === 'customerDto.name') {
            if (error.error[i].code === 'NotBlank') {
              this.messCustomerName = error.error[i].defaultMessage;
            } else {
              this.messCustomerNamePattern = error.error[i].defaultMessage;
            }
          }
          if (error.error[i].field === 'customerDto.phoneNumber') {
            if (error.error[i].code === 'NotBlank') {
              this.messPhoneNumber = error.error[i].defaultMessage;
            } else {
              this.messPhoneNumberPattern = error.error[i].defaultMessage;
            }
          }
          if (error.error[i].field === 'customerDto.idCard') {
            if (error.error[i].code === 'NotBlank') {
              this.messCCCD = error.error[i].defaultMessage;
            } else {
              this.messCCCDPattern = error.error[i].defaultMessage;
            }
          }
          if (error.error[i].field === 'customerDto.email') {
            if (error.error[i].code === 'NotBlank') {
              this.messEmail = error.error[i].defaultMessage;
            } else {
              this.messEmailPattern = error.error[i].defaultMessage;
            }
          }
          if (error.error[i].field === 'customerDto.dateOfBirth') {
            if (error.error[i].code === 'NotBlank') {
              this.messDateOfBirth = error.error[i].defaultMessage;
            } else {
              this.messDateOfBirthPattern = error.error[i].defaultMessage;
            }
          }
          if (error.error[i].field === 'customerDto.street') {
            if (error.error[i].code === 'NotBlank') {
              this.messStreet = error.error[i].defaultMessage;
            }
          }
          if (error.error[i].field === 'customerDto.gender') {
            if (error.error[i].code === 'NotBlank') {
              this.messStreet = error.error[i].defaultMessage;
            }
          }
        }
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
