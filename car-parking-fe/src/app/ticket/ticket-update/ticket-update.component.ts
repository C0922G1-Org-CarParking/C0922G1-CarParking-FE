import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../service/ticket.service';
import {EditTicket} from '../../model/edit-ticket';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Floor} from '../../model/floor';
import {FloorService} from '../../service/floor.service';
import {TicketType} from '../../model/ticket-type';
import {TicketTypeService} from '../../service/ticket-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Updateticket} from '../../model/updateticket';
import {ILocation} from '../../model/ilocation';
import {UpdateTicket} from '../../model/update-ticket';
import {Section} from '../../model/section';
import Swal from "sweetalert2";

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrls: ['./ticket-update.component.css']
})
export class TicketUpdateComponent implements OnInit {

  rate: any;
  oldExpiryDate: string;
  priceNew = 0;
  ticketEdit: EditTicket;
  editTicketForm: FormGroup;
  floorList: Floor[];
  ticketTypeList: TicketType[];
  newExpiryDate = '';
  ticketTypeUpdate: Updateticket;
  locationList: ILocation[];
  sectionList: Section[];
  id: number;

  constructor(private ticketService: TicketService,
              private floorService: FloorService,
              private ticketTypeService: TicketTypeService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.ticketService.getListFloor().subscribe(listFloor => {
      this.floorList = listFloor;
      this.ticketTypeService.getAllTicketType().subscribe(ticketTypeList => {
        this.ticketTypeList = ticketTypeList;
        this.activatedRoute.paramMap.subscribe(paramMap => {
          this.ticketService.findByTicketId(+paramMap.get('id')).subscribe(ticketEdit => {
            this.ticketEdit = ticketEdit;
            this.rate = ticketEdit.rate;
            this.oldExpiryDate = ticketEdit.effectiveDate;
            console.log(ticketEdit);
            this.initForm();
          });
        });
      });
    });
  }

  getListSectionOfFloor(idFloor) {
    this.ticketService.listSectionById(idFloor).subscribe(sectionList => {
      this.sectionList = sectionList;
    });
  }

  getListLocationOfFloor(idFloor, idSection) {
    this.ticketService.listLocation(idFloor, idSection).subscribe(locationList => {
      this.locationList = locationList;
    });
  }

  initForm() {
    this.editTicketForm = new FormGroup({
      customerName: new FormControl(this.ticketEdit.customerName),
      plateNumber: new FormControl(this.ticketEdit.plateNumber),
      phoneNumber: new FormControl(this.ticketEdit.phoneNumber),
      effectiveDate: new FormControl(this.ticketEdit.effectiveDate),
      expiryDate: new FormControl(this.ticketEdit.expiryDate),
      floorId: new FormControl(this.ticketEdit.floorId),
      locationId: new FormControl(this.ticketEdit.locationId),
      priceNew: new FormControl(this.priceNew),
      ticketType: new FormControl(this.ticketEdit.ticketTypeId, [Validators.required]),
    });
  }

  editInfoTicket() {
    if (this.editTicketForm.valid) {
      let id = +this.ticketEdit.ticketId;
      let expiryDate = this.editTicketForm.get('expiryDate').value;
      let totalPrice = +(this.editTicketForm.get('priceNew').value + this.ticketEdit.totalPrice);
      let ticketTypeId = +this.editTicketForm.get('ticketType').value;
      let locationId = +this.editTicketForm.get('locationId').value;

      const ticketEdit: UpdateTicket = {
        id,
        expiryDate,
        totalPrice,
        ticketTypeId,
        locationId
      };
      this.ticketService.updateTicketType(ticketEdit).subscribe(next => {
        this.router.navigateByUrl('/ticket/list');
        Swal.fire({
          title: 'Sửa thành công!',
          icon: 'success',
          confirmButtonText: 'Xác nhận',
          confirmButtonColor: 'darkorange'
        });
      }, error => {
        alert('lỗi');
      });
    }
  }

  getRenewalPrice(newExpiryDate: string) {
    this.ticketService.getPrice(this.ticketEdit.expiryDate, newExpiryDate, this.ticketEdit.rate).subscribe(price => {
      this.priceNew = price;

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
    };
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
    } else {
      date += newDate.getDate();
    }
    if (newDate.getMonth() < 10) {
      month = '0' + (newDate.getMonth() + 1);
    } else {
      month += (newDate.getMonth() + 1);
    }
    let year = newDate.getFullYear();
    let newExpiryDateFormatted = year + '-' + month + '-' + date;
    this.getRenewalPrice(newExpiryDateFormatted);
  }
}
