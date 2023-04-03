import {Component, OnInit} from '@angular/core';
import {CarTicket} from "../../model/car-ticket";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../model/customer";
import {Car} from "../../model/car";
import {Ticket} from "../../model/ticket";

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {

  }

}
