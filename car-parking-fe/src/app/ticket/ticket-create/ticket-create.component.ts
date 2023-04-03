<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {Ticket} from "../../model/ticket";
=======
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

import {Subscription} from "rxjs";
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
<<<<<<< HEAD
  private ticketList: Ticket[];
  constructor(private ticketService: TicketService) { }
=======

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
  locationInfo: Location;
  locationInfoName: any;
  rate:any
  priceTotal :any
  effectiveDate:any
  expiryDate:any


  constructor(private router: Router,
              private ticketService: TicketService,
              private employeeService: EmployeeService,
              private customerService: CustomerService,
              private locationService: LocationService,
              private floorService: FloorService,
              private ticketTypeService: TicketTypeService,
              private activatedRoute: ActivatedRoute,
              ) {
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee

  }


<<<<<<< HEAD
=======
  ngOnInit(): void {

    this.employeeService.listEmployee().subscribe(data => {
      this.employeeList = data
    })
    this.locationService.listLocation().subscribe(data => {
      this.locationList = data
    })
    this.floorService.listFloor().subscribe(data => {
      this.floorList = data
    })
    this.ticketTypeService.listTicketType().subscribe(data => {
      this.ticketTypeList = data
    })
    this.activatedRoute.paramMap.subscribe(data => {
      const id = data.get('id');
      if (id != null) {
        this.getCustomerById(+id)
      }
    })
    // this.getPrice(this.effectiveDate,this.expiryDate,this.rate)
    // this.activatedRoute.paramMap.subscribe(data => {
    //   const id = data.get('idLocation');
    //   if (id != null) {
    //     this.getLocationById(+id)
    //   }
    // })



    this.ticketCreateForm = new FormGroup({
      // id: new FormControl(),
      effectiveDate: new FormControl(this.ticket?.effectiveDate,[Validators.required]),
      expiryDate: new FormControl(this.ticket?.expiryDate,[Validators.required]),
      isDeleted: new FormControl(0),
      price: new FormControl(15000,[Validators.required]),
      totalPrice: new FormControl(this.ticket?.totalPrice,[Validators.required]),
      ticketType: new FormControl(this.ticket?.ticketType,[Validators.required]),
      location: new FormControl(this.ticket?.location,[Validators.required]),
      car: new FormControl(this.ticket?.car,[Validators.required]),
      employee: new FormControl(this.ticket?.employee,[Validators.required]),
    })

  }

  createTicket() {
    this.ticket = this.ticketCreateForm.value
    if (this.ticket) {
      let temp = this.ticketService.createTicket(this.ticket).subscribe(ok => {
        if (ok && temp)
          alert('Thêm mới thành công')
        this.router.navigateByUrl('/ticket/create');
      });
    } else {
      alert('Vui lòng kiểm tra lại thông tin');
    }


  }

  searchCustomerByName(name: string) {
    if (name) {
      this.customerService.searchName(name).subscribe(data => {
        this.customerList = data;
        this.router.navigateByUrl("/ticket/create")
        // this.ngOnInit()
      })
    } else {
      alert("Không tìm thấy tên khách hàng")
      this.customerList = []
      this.router.navigateByUrl("/ticket/create")
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
    this.customerService.getCarListOfCustomerById(id).subscribe(data =>{
      this.carList = data
      this.enableChooseCar = true

    })
  }

  // private getLocationById(id: number) {
  //   this.locationService.findLocationEmptyById(id).subscribe(data=>{
  //     this.locationInfo = data
  //     this.locationInfoName = this.locationInfo.name
  //   })
  // }
  getRate(value: string) {
    let idCar = parseInt(value)
    this.ticketService.findRateByIdCar(idCar).subscribe(data =>{
      this.rate = data
      console.log(this.rate)
      this.getPrice(this.effectiveDate,this.expiryDate,this.rate);
    })
  }

  getPrice(effectiveDate: string, expiryDate: string, rate: any) {
    if(effectiveDate != null && expiryDate != null && rate != null){
      this.ticketService.getPrice(effectiveDate,expiryDate,rate).subscribe(data =>{
        this.priceTotal = data
        debugger
      })
    }
  }

  getEffectiveDate(value: string) {
    this.effectiveDate = value;
    this.getPrice(this.effectiveDate,this.expiryDate,this.rate);
  }

  expiryDates(value: string) {
    this.expiryDate = value;
    this.getPrice(this.effectiveDate,this.expiryDate,this.rate);

  }
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee
}
