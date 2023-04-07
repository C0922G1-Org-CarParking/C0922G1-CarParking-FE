import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, Validators} from "@angular/forms";
import {Employee} from "../../model/employee";
import {IPosition} from "../../model/iposition";
import {TicketType} from "../../model/ticket-type";
import {ILocation} from "../../model/ilocation";
import {Car} from "../../model/car";
import {TicketService} from "../../service/ticket.service";
import {EmployeeService} from "../../service/employee.service";
import {CustomerService} from "../../service/customer.service";
import {LocationService} from "../../service/location.service";
import {Floor} from "../../model/floor";
import {FloorService} from "../../service/floor.service";
import {TicketTypeService} from "../../service/ticket-type.service";
import {Customer} from "../../model/customer";
import {Ticket} from "../../model/ticket";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrencyPipe} from '@angular/common';
import Swal from 'sweetalert2'
import {Section} from "../../model/section";
import * as moment from 'moment';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  employeeList: Employee[] = [];
  locationList: ILocation[] = [];
  floorList: Floor[] = [];
  ticketTypeList: TicketType[] = [];
  customerList: Customer[] = [];
  ticket: Ticket
  customer: Customer
  ticketCreateForm: FormGroup;
  tenKhachHang: any;
  soDienThoaiKhachHang: any;
  idKhachHang: any;
  carList: Car[] = [];
  enableChooseCar: boolean = false;
  locationInfo: ILocation;
  sectionList: Section[];
  location: ILocation;
  rate: any
  priceTotal: any
  effectiveDate: any
  expiryDate: any
  messCar: boolean = true
  floorId: any
  sectionId: any
  chooseEnableLocation:boolean = false
  getInfoLocationEnable:boolean = false


  constructor(
    private router: Router,
    private ticketService: TicketService,
    private employeeService: EmployeeService,
    private customerService: CustomerService,
    private locationService: LocationService,
    private floorService: FloorService,
    private ticketTypeService: TicketTypeService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.ticketCreateForm = new FormGroup({
      effectiveDate: new FormControl(this.ticket?.effectiveDate, [Validators.required]),
      expiryDate: new FormControl(this.ticket?.expiryDate, [Validators.required]),
      isDeleted: new FormControl(0),
      price: new FormControl(15000, [Validators.required]),
      totalPrice: new FormControl(this.ticket?.totalPrice, [Validators.required]),
      ticketType: new FormControl(this.ticket?.ticketType, [Validators.required]),
      location: new FormControl(this.ticket?.location, [Validators.required]),
      car: new FormControl(this.ticket?.car, [Validators.required]),
      employee: new FormControl(this.ticket?.employee, [Validators.required]),
    },{ validators: this.validateDateRange })

  }

  validateDateRange(formGroup: FormGroup) {
    const effectiveDate = moment(formGroup.get('effectiveDate').value, 'YYYY-MM-DD');
    const expiryDate = moment(formGroup.get('expiryDate').value, 'YYYY-MM-DD');
    if (effectiveDate > expiryDate) {
      formGroup.get('expiryDate').setErrors({ invalidDateRange: true });
      return { invalidDateRange: true };
    } else {
      formGroup.get('expiryDate').setErrors(null);
      return null;
    }
  }

  ngOnInit(): void {
    this.ticketService.listEmployee().subscribe(data => {
      this.employeeList = data
    })
    this.ticketService.listFloor().subscribe(data => {
      this.floorList = data
      this.ticketTypeService.getAllTicketType().subscribe(data => {
        this.ticketTypeList = data
      })
    })
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('idLocation');
      if (id != null) {
        this.getLocationById(+id)

      }
    })


    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.getCustomerById(+id)
      }
    })
    this.getPrice(this.effectiveDate,this.expiryDate,this.rate)
  }




  createTicket() {
    if (this.ticketCreateForm.valid) {
      this.ticket = this.ticketCreateForm.value
      this.ticketService.createTicket(this.ticket).subscribe(ok => {
        debugger
        // alert('Thêm mới thành công')
        Swal.fire('Thêm mới thành công', '', 'success')
        this.ticketCreateForm.reset()
        this.router.navigateByUrl('/ticket/create');
      });
    } else {
      Swal.fire('Thêm mới thất bại', '', 'error')
    }
  }

  searchCustomerByName(name: string) {
    if (name) {
      this.customerService.searchName(name).subscribe(data => {
        debugger
        this.customerList = data;
        this.ngOnInit()
        // this.ngOnInit()
      })
    } else {
      Swal.fire('Cần nhập để tìm khách hàng', '', 'error')
      this.customerList = []
    }
  }

  private getCustomerById(id: number) {
    this.customerService.findCustomerById(id).subscribe(data => {
      this.customer = data
      this.idKhachHang = this.customer.id
      this.tenKhachHang = this.customer.name
      this.soDienThoaiKhachHang = this.customer.phoneNumber
      this.getCarListOfCustomerById(this.idKhachHang)
    })
  }


  private getCarListOfCustomerById(id: number) {
    this.customerService.getCarListOfCustomerById(id).subscribe(data => {
      this.carList = data
      debugger
      this.messCar = false
      this.enableChooseCar = true
    })
  }

  private getLocationById(id: number) {
    this.locationService.findLocationEmptyById(id).subscribe(data=>{
      this.locationInfo = data
      this.getInfoLocationEnable = true
      this.ngOnInit()
    })
  }


  getPrice(effectiveDate: string, expiryDate: string, rate: any) {
    if (effectiveDate != null && expiryDate != null && rate != null) {
      this.ticketService.getPrice(effectiveDate, expiryDate, rate).subscribe(data => {
        this.priceTotal = data;
        // this.currencyPipe.transform(data,this.priceTotal, 'VND ', '1.0-3')
        debugger
      })
    }
  }

  getEffectiveDate(value: string) {
    this.effectiveDate = value;
    this.getPrice(this.effectiveDate, this.expiryDate, this.rate);
  }

  expiryDates(value: string) {
    this.expiryDate = value;
    this.getPrice(this.effectiveDate, this.expiryDate, this.rate);

  }

  getListSectionById(floorId: string) {
    this.floorId = parseInt(floorId)
    debugger
    this.ticketTypeService.getListSectionById(this.floorId).subscribe(data => {
      this.sectionList = data
    })
  }

  getSectionId(value: string) {
    this.sectionId = parseInt(value)
    this.ticketService.listLocation(this.floorId, this.sectionId).subscribe(data => {
      this.locationList = data
      this.chooseEnableLocation = true
    })
  }

  getRate($event: Event) {
    let idCar = this.ticketCreateForm.get('car').value;
    this.ticketService.findRateByIdCar(idCar.id).subscribe(data => {
      this.rate = data
      this.getPrice(this.effectiveDate, this.expiryDate, this.rate);
    })
  }
}
