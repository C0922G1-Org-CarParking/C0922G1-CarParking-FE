import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../service/customer.service";
import {CarService} from "../../service/car.service";
import {CarTypeService} from "../../service/car-type.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../model/customer";
import {CarType} from "../../model/car-type";
import {Car} from "../../model/car";
import {catchError, switchMap} from "rxjs/operators";
import {forkJoin, of} from "rxjs";
import {CustomerVu} from "../../model/customer-vu";
import Swal from 'sweetalert2';


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
  valueProvince: string = "";
  valueDistrict: string = "";
  item: Car = {};
  districtList: any;
  provinceList: any;
  communeList: any;
  private Swal: any;

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
  constructor(private customerService: CustomerService,
              private carService: CarService,
              private carTypeService: CarTypeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    // this.view();
    this.customerService.getAllProvince().subscribe(next => {
      this.provinceList = next.data.data
    });

    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id')
      this.createFormCar(this.id)
      this.getCustomerById(this.id);

    })
  }

  getCustomerById(id: number) {
    this.customerService.findCustomerVuById(id)
      .pipe(
        switchMap((customer) => {
          this.customer = customer;
          return forkJoin({
            provinces: this.customerService.getAllProvince(),
            districts: this.customerService.getAllDistrict(customer.province),
            communes: this.customerService.getAllCommune(customer.district),
            cars: this.carService.findCarById(id),
            carTypes: this.carTypeService.getAllCarType()
          })
        })
      )
      .subscribe((result) => {
        const {provinces, districts, communes, cars, carTypes} = result;

        this.provinceList = provinces.data.data;
        this.districtList = districts.data.data;
        this.communeList = communes.data.data;
        this.carList = cars;
        this.carTypeList = carTypes;

        this.formEditCustomer = new FormGroup({
          id: new FormControl(this.customer.id),
          name: new FormControl(this.customer.name, [Validators.required, Validators.pattern('^[a-zA-ZÀ-ỹ\\s ]*$'), Validators.maxLength(30)]),
          idCard: new FormControl(this.customer.idCard, [Validators.required, Validators.pattern('^(\\d{9}|\\d{12})$')]),
          gender: new FormControl(this.customer.gender, [Validators.required]),
          dateOfBirth: new FormControl(this.customer.dateOfBirth, [Validators.required, this.birthDateValidator1, this.birthDateValidator]),
          phoneNumber: new FormControl(this.customer.phoneNumber, [Validators.required, Validators.pattern('^(((\\+|)84)|0)(3|5|7|8|9)+([0-9]{8})$')]),
          email: new FormControl(this.customer.email, [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
          province: new FormControl(this.customer.province, [Validators.required]),
          district: new FormControl(this.customer.district, [Validators.required]),
          commune: new FormControl(this.customer.commune, [Validators.required]),
          street: new FormControl(this.customer.street, [Validators.required]),
          carList: new FormArray([])
        });

        cars.forEach(car => {
          const carFormGroup = new FormGroup({
            name: new FormControl(car.name),
            brand: new FormControl(car.brand),
            carType: new FormControl(car.carType),
            plateNumber: new FormControl(car.plateNumber),
            customer: new FormControl(this.customer),
          });
          (this.formEditCustomer.get('carList') as FormArray).push(carFormGroup);
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
    })
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


  addCar() {
    const newCar: Car = {
      name: this.formCreateCar.get('name').value,
      brand: this.formCreateCar.get('brand').value,
      carType: this.formCreateCar.get('carType').value,
      plateNumber: this.formCreateCar.get('plateNumber').value,
      customer: this.formCreateCar.get('customer').value
    };

    // Thêm xe mới vào mảng xe cũ
    this.carList.push(newCar);

    // Tạo FormGroup mới từ xe mới thêm vào
    const carFormGroup = new FormGroup({
      name: new FormControl(newCar.name),
      brand: new FormControl(newCar.brand),
      carType: new FormControl(newCar.carType),
      plateNumber: new FormControl(newCar.plateNumber),
      customer: new FormControl(newCar.customer)
    });

    // Thêm FormGroup mới vào FormArray
    const carListFormArray = this.formEditCustomer.get('carList') as FormArray;
    carListFormArray.push(carFormGroup);

    // Cập nhật lại giá trị của carList
    this.carList = carListFormArray.getRawValue();
    this.formCreateCar.reset();
  }

  deleteCar(plateNumber: string) {

    const carListFormArray = this.formEditCustomer.get('carList') as FormArray;

    // Tìm xe có plateNumber trùng với tham số của hàm
    const index = carListFormArray.controls.findIndex(control => control.value.plateNumber === plateNumber);

    // Nếu tìm thấy xe, xoá xe đó ra khỏi FormArray
    if (index !== -1) {
      carListFormArray.removeAt(index);

      // Cập nhật lại giá trị của carList
      this.carList = carListFormArray.getRawValue();
    }
  }

  getProvince(value: string) {
    this.valueProvince = value;
    this.customerService.getAllDistrict(parseInt(value)).subscribe(next => {
      this.districtList = next.data.data
    })
  }

  getDistrict(value: string) {
    this.valueDistrict = value;
    if (this.valueProvince === "") {
      alert("Bạn phải chọn tỉnh")
    }
    this.customerService.getAllCommune(parseInt(value)).subscribe(next => {
      this.communeList = next.data.data
    })
  }

  getCommune(value: string) {
    if (this.valueDistrict === "") {
      alert("Bạn phải chọn huyện")
    }
  }

  updateCustomer(id: number) {
    if (this.formEditCustomer.valid){
      this.messCustomerName = "";
      this.messStreet = "";
      this.messCCCD = "";
      this.messDateOfBirth = "";
      this.messEmail = "";
      this.messPhoneNumber = ""

      const customerCar = this.formEditCustomer.value;
      this.customerService.updateCustomer(id, customerCar).subscribe(() => {

            Swal.fire('Thêm mới khách hàng thành công.', '', 'success')

        this.router.navigateByUrl('/customer/list')
        }, error => {

          for (let i = 0; i < error.error.length; i++) {
            if (error.error[i].field === 'name') {
              if (error.error[i].code === 'NotBlank') {
                this.messCustomerName = error.error[i].defaultMessage;
              } else {
                this.messCustomerNamePattern = error.error[i].defaultMessage;
              }
            }
            if (error.error[i].field === 'customerCarDto.phoneNumber') {
              if (error.error[i].code === 'NotBlank') {
                this.messPhoneNumber = error.error[i].defaultMessage;
              } else {
                this.messPhoneNumberPattern = error.error[i].defaultMessage;
              }
            }
            if (error.error[i].field === 'idCard') {
              if (error.error[i].code === 'NotBlank') {
                this.messCCCD = error.error[i].defaultMessage;
              } else {
                this.messCCCDPattern = error.error[i].defaultMessage;
              }
            }
            if (error.error[i].field === 'email') {
              if (error.error[i].code === 'NotBlank') {
                this.messEmail = error.error[i].defaultMessage;
              } else {
                this.messEmailPattern = error.error[i].defaultMessage;
              }
            }
            if (error.error[i].field === 'dateOfBirth') {
              if (error.error[i].code === 'NotBlank') {
                this.messDateOfBirth = error.error[i].defaultMessage;
              } else {
                this.messDateOfBirthPattern = error.error[i].defaultMessage;
              }
            }
            if (error.error[i].field === 'street') {
              if (error.error[i].code === 'NotBlank') {
                this.messStreet = error.error[i].defaultMessage;
              }
            }

          }
        }
      );
    }
  }
  view(): void {
    const element = document.getElementById('login');
    if (element) {
      element.scrollIntoView();
    }
  }
}


