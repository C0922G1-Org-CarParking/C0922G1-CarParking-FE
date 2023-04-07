import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
      id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ỹ\\s ]*$'), Validators.maxLength(20)]),
      dateOfBirth: new FormControl('', [Validators.required, this.birthDateValidator1, this.birthDateValidator]),
      idCard: new FormControl('', [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[\\w]+[@][\\w]+.[\\w]+')]),
      isGender: new FormControl(true, Validators.required),
      province: new FormControl(''),
      district: new FormControl(''),
      commune: new FormControl(''),
      street: new FormControl('', Validators.required),
      isDelete: new FormControl(),
    });
    this.carTypeService.getAllCarType().subscribe(next => {
      this.carTypeList = next;
    });

    this.carForm = this.fb?.group({
      id: new FormControl(),

      name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      plateNumber: new FormControl('', [Validators.required, Validators.pattern('^[A-Z0-9]+$')]),

      carType: new FormControl('', Validators.required),
      brand: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      isDelete: new FormControl()
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
    if (this.customerForm.valid) {
      this.customerService?.createCustomer(this.customerForm.value, this.cars).subscribe(data => {
          console.log(data)
          Swal.fire({
            icon: 'success',
            iconColor: 'darkorange',
            title: 'Thêm mới khách hàng thành công.',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          })
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
  }

  addCar() {
    debugger
    this.cars.push(this.carForm.value);
    this.carForm.reset();
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

  resetFormCar() {
    this.carForm.reset()
  }

  birthDateValidator1(control: AbstractControl): { [key: string]: any } | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const diff = today.getFullYear() - birthDate.getFullYear();
    if (diff < 18 && diff > 0) {
      return {'invalidBirthDate1': {value: control.value}};
    }
    return null;
  }


  birthDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    const dob = new Date(value);
    const currentDate = new Date();
    if (dob > currentDate) {
      return {invalidDateOfBirth: true};
    }
    return null;
  }
}
