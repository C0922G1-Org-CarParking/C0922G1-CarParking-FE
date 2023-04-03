import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CarType} from '../../model/car-type';
import {Car} from '../../model/car';
import {CustomerService} from '../../service/customer.service';
import {CarService} from '../../service/car.service';
import {CarTypeService} from '../../service/car-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CustomerVu} from '../../model/customer-vu';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  formEditCustomer: FormGroup;
  customer: CustomerVu;
  carTypeList: CarType[] = [];
  carList: Car[] = [];
  formCreateCar: FormGroup;
  id: number;
  valueProvince = '';
  valueDistrict = '';
  item: Car = {};
  districtList: any;
  provinceList: any;
  communeList: any;
  private Swal: any;

  constructor(private customerService: CustomerService,
              private carService: CarService,
              private carTypeService: CarTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      console.log(this.id);
      this.createFormCar(this.id);
      this.getCustomerById(this.id);
    });
  }

  ngOnInit(): void {
    this.customerService.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data;
    });
  }


  getCustomerById(id: number) {
    this.customerService.findCustomerById(id).subscribe((customer) => {
      this.customer = customer;
      this.carService.findCarById(id).subscribe((cars) => {
        this.carList = cars;
        this.carTypeService.getAllCarType().subscribe((carTypes) => {
          this.carTypeList = carTypes;
          // Reactive form group for customer information
          this.formEditCustomer = new FormGroup({
            id: new FormControl(customer.id),
            name: new FormControl(customer.name, [Validators.required, Validators.maxLength(30)]),
            idCard: new FormControl(customer.idCard, [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
            gender: new FormControl(customer.gender, [Validators.required]),
            dateOfBirth: new FormControl(customer.dateOfBirth, [Validators.required]),
            phoneNumber: new FormControl(customer.phoneNumber, [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
            email: new FormControl(customer.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
            province: new FormControl(customer.province, [Validators.required]),
            district: new FormControl(customer.district, [Validators.required]),
            commune: new FormControl(customer.commune, [Validators.required]),
            street: new FormControl(customer.street, [Validators.required]),
            carList: new FormArray([]),
          });
          cars.forEach(car => {
            const carFormGroup = new FormGroup({
              name: new FormControl(car.name),
              brand: new FormControl(car.brand),
              carType: new FormControl(car.carType),
              plateNumber: new FormControl(car.plateNumber),
              customer: new FormControl(customer),
            });
            (this.formEditCustomer.get('carList') as FormArray).push(carFormGroup);
          });
        });
      });
    });

  }

  createFormCar(id: number) {
    this.customerService.findCustomerById(id).subscribe(custom => {
      this.formCreateCar = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        brand: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
        carType: new FormControl('', [Validators.required]),
        plateNumber: new FormControl('', [Validators.required, Validators.pattern('^[A-Z1-9]+$')]),
        customer: new FormControl(custom),
      });
    });
  }

  addCar() {
    const newCar: Car = {
      name: this.formCreateCar.get('name').value,
      brand: this.formCreateCar.get('brand').value,
      carType: this.formCreateCar.get('carType').value,
      plateNumber: this.formCreateCar.get('plateNumber').value,
      customer: this.formCreateCar.get('customer').value
    };
    console.log('newCar:', newCar);
    // Thêm xe m?i vào m?ng xe cu
    this.carList.push(newCar);

    // T?o FormGroup m?i t? xe m?i thêm vào
    const carFormGroup = new FormGroup({
      name: new FormControl(newCar.name),
      brand: new FormControl(newCar.brand),
      carType: new FormControl(newCar.carType),
      plateNumber: new FormControl(newCar.plateNumber),
      customer: new FormControl(newCar.customer)
    });

    // Thêm FormGroup m?i vào FormArray
    const carListFormArray = this.formEditCustomer.get('carList') as FormArray;
    carListFormArray.push(carFormGroup);

    // C?p nh?t l?i giá tr? c?a carList
    this.carList = carListFormArray.getRawValue();
    this.formCreateCar.reset();
  }

  deleteCar(plateNumber: string) {

    const carListFormArray = this.formEditCustomer.get('carList') as FormArray;

    // Tìm xe có plateNumber trùng v?i tham s? c?a hàm
    const index = carListFormArray.controls.findIndex(control => control.value.plateNumber === plateNumber);

    // N?u tìm th?y xe, xoá xe dó ra kh?i FormArray
    if (index !== -1) {
      carListFormArray.removeAt(index);

      // C?p nh?t l?i giá tr? c?a carList
      this.carList = carListFormArray.getRawValue();
    }
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

  updateCustomer(id: number) {
    const customerCar = this.formEditCustomer.value;
    this.customerService.updateCustomer(id, customerCar).subscribe(() => {
      this.Swal.fire({
        title: 'Success!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    });
  }
}





