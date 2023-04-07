import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/service/customer.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import {CustomerWaitingToDelete} from '../../dto/customer-waiting-to-delete';

@Component({
  selector: 'app-status-delete-customer',
  templateUrl: './status-delete-customer.component.html',
  styleUrls: ['./status-delete-customer.component.css']
})
export class StatusDeleteCustomerComponent implements OnInit {
  // customersWaitingToDelete: CustomerWaitingToDelete = {id: 0,name: '', email: '', status: false};
  // customersWaitingToDeletes: CustomerWaitingToDelete[] = [];
  // sizeCustomersWaitingToDelete: number = 0;
  email: string;

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.email = param.get('id');
    });
  }

  // this.customersWaitingToDeletes.push(this.customersWaitingToDelete);
  // this.sizeCustomersWaitingToDelete = this.customersWaitingToDeletes.length;
  ngOnInit(): void {
    this.customerService.renderEmail(this.email);
  }
}
