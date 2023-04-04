import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {CustomerService} from '../../service/customer.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-status-delete-customer',
  templateUrl: './status-delete-customer.component.html',
  styleUrls: ['./status-delete-customer.component.css']
})
export class StatusDeleteCustomerComponent implements OnInit {
  id: number;

  constructor(private customerService: CustomerService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
    });
  }

  ngOnInit(): void {
    this.customerService.customerConfirmDelete(this.id).subscribe(next => {
      Swal.fire( 'Xóa khách hàng thành công', '', 'success');
    }, error => {
      Swal.fire( 'Xóa không thành công, vui lòng liên hệ với nhân viên để được tư vấn thêm.', '', 'error');
    });
  }
}
