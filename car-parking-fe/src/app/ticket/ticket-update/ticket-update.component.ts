import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {EditTicket} from "../../model/edit-ticket";
import {FormControl, FormGroup} from "@angular/forms";
import {Floor} from "../../model/floor";
import {FloorService} from "../../service/floor.service";
import {TicketType} from "../../model/ticket-type";
import {TicketTypeService} from "../../service/ticket-type.service";
import {error} from "@angular/compiler/src/util";
import {ActivatedRoute} from "@angular/router";
import {switchMapTo} from "rxjs/operators";
import {getLocaleMonthNames} from "@angular/common";
import {LocationService} from "../../service/location.service";
import {ILocation} from "../../model/ilocation";

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {

  rate: any;
  oldExpiryDate: string;
  totalPrice = 0;
  ticketEdit: EditTicket;
  editTicketForm: FormGroup;
  floorList: Floor[];
  ticketTypeList: TicketType[];
  newExpiryDate = '';
  idLocation: number;
   location:ILocation;
   idTicketEdit:number;
  constructor(private ticketService: TicketService,
              private floorService: FloorService,
              private ticketTypeService: TicketTypeService,
              private activatedRoute: ActivatedRoute, private locationService: LocationService) {


  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param =>{
      this.idLocation= +param.get('idLocation');
      this.findLocation();
    });
    this.ticketTypeService.getAllTicketType().subscribe(ticketTypeList => {

      debugger
      this.ticketTypeList = ticketTypeList;
      console.log(ticketTypeList);
      this.activatedRoute.paramMap.subscribe(paramMap => {
        this.idTicketEdit = +paramMap.get('id')
        this.ticketService.findByTicketId(+paramMap.get('id')).subscribe(ticketEdit => {

          this.ticketEdit = ticketEdit;
          this.rate = ticketEdit.rate;
          this.oldExpiryDate = ticketEdit.expiryDate;
          console.log(ticketEdit);
          this.initForm();
        })
      })
    })
  }
  findLocation(){
    this.locationService.findLocationEmptyById(this.idLocation).subscribe(param =>{
      this.location = param
    })
  }

  initForm() {
    this.editTicketForm = new FormGroup({
      id: new FormControl(this.ticketEdit.id),
      customerName: new FormControl(this.ticketEdit.customerName),
      plateNumber: new FormControl(this.ticketEdit.plateNumber),
      phoneNumber: new FormControl(this.ticketEdit.phoneNumber),
      effectiveDate: new FormControl(this.ticketEdit.effectiveDate),
      expiryDate: new FormControl(this.ticketEdit.expiryDate),
      floorId: new FormControl(this.location?.floor.name),
      locationId: new FormControl(this.location?.name),
      sectionId: new FormControl(this.location?.section.name),
      totalPrice: new FormControl(''),
      ticketType: new FormControl(""),
    });
  }

  editInfoTicket() {
    const ticketLocal = this.editTicketForm.value;

    console.log(ticketLocal);

    if (this.editTicketForm.valid) {
      this.ticketService.updateTicket(ticketLocal).subscribe(next => {
        console.log(next);
      }, error => {
        alert("lỗi")
      })
    }
  }

  getRenewalPrice(newExpiryDate: string) {
    debugger
    this.ticketService.getRenewalPrice(newExpiryDate, this.oldExpiryDate, this.rate).subscribe(price => {
      this.totalPrice = price;
    });
  }

  onChange() {
    const dateString = this.editTicketForm.get('expiryDate').value;
    const dateObject = new Date(Date.parse(dateString));
    let newDate = new Date(dateObject);
    const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }
    debugger
    console.log(this.ticketTypeList);
    const ticketTypeId = this.editTicketForm.get('ticketType').value;

    switch (ticketTypeId) {
      case '1':
        newDate.setDate(dateObject.getDate() + 1);
        break;
      case '2':
        newDate.setDate(dateObject.getDate() + 7);
        break;
      case '3':
        newDate.setMonth(dateObject.getMonth() + 1);
        break;
      case '4':
        newDate.setFullYear(dateObject.getFullYear() + 1);
        break;
    }
    this.newExpiryDate = newDate.toLocaleString('vi-VN', options);
    let date = '';
    let month = '';
    if (newDate.getDate() < 10) {
       date = '0' + newDate.getDate();
    } else date += newDate.getDate();
    if (newDate.getMonth() < 10) {
       month = '0' + (newDate.getMonth() + 1);
    } else month += (newDate.getMonth() + 1);
    let year = newDate.getFullYear();
    let newExpiryDateFormatted = year + '-' + month + '-' + date;
    this.getRenewalPrice(newExpiryDateFormatted);
  }
}
