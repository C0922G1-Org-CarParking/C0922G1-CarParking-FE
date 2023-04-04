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


  constructor(private ticketService: TicketService,
              private floorService: FloorService,
              private ticketTypeService: TicketTypeService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.ticketTypeService.getAllTicketType().subscribe(ticketTypeList => {
      this.ticketTypeList = ticketTypeList;
      debugger
      this.activatedRoute.paramMap.subscribe(paramMap =>{
        this.ticketService.findByTicketId(+paramMap.get('id')).subscribe(ticketEdit=>{
          this.ticketEdit = ticketEdit;
          this.rate = ticketEdit.rate;
          // this.editTicketForm.patchValue(ticketEdit);
          this.oldExpiryDate = ticketEdit.expiryDate;
          console.log(ticketEdit);
          this.initForm();
          debugger
        })
      })
    })
  }

  initForm(){
    this.editTicketForm = new FormGroup({
      id: new FormControl(this.ticketEdit.id),
      customerName: new FormControl(this.ticketEdit.customerName),
      plateNumber: new FormControl(this.ticketEdit.plateNumber),
      phoneNumber: new FormControl(this.ticketEdit.phoneNumber),
      effectiveDate: new FormControl(this.ticketEdit.effectiveDate),
      expiryDate: new FormControl(this.ticketEdit.expiryDate),
      floorId: new FormControl(''),
      locationId: new FormControl(''),
      sectionId: new FormControl(''),
      totalPrice: new FormControl(''),
      ticketTypeId: new FormControl(this.ticketTypeList.filter(item=>{
        item.id = this.ticketEdit.ticketTypeId;
      })),
    });
    debugger
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
    this.ticketService.getRenewalPrice(newExpiryDate, this.oldExpiryDate, this.rate).subscribe(price => {
      this.totalPrice = price;
    });
  }

}
