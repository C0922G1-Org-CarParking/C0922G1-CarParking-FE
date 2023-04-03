import {Component, OnInit} from '@angular/core';
import {Customer} from '../../model/customer';
import {CarTicket} from '../../model/car-ticket';
import {CustomerService} from '../../service/customer.service';
import {CarService} from '../../service/car.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  customer: Customer;
  carTickets: CarTicket[];
  customerId: number;
  district: string;
  province: string;
  commune: string;

  constructor(private customerService: CustomerService,
              private carService: CarService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.customerId = +param.get('id');
    });
  }

  ngOnInit(): void {
    this.customerService.findByCustomerId(this.customerId).subscribe((next) => {
      this.customer = next;
    }, (err) => {
      alert(err.toString());
      console.log(err.toString());
    }, () => {
      this.carService.findCarByCustomerId(this.customerId).subscribe(next => {
        this.carTickets = next;
        console.log(next);
      });
    });

    this.customerService.getAllProvince().subscribe(next => {
      this.province = next.data.data.filter(n => n.code == parseInt(this.customer.province))[0].name;

      this.customerService.getAllDistrict(parseInt(this.customer.province)).subscribe(next => {
        this.district = next.data.data.filter(n => n.code == parseInt(this.customer.district))[0].name;
      });

      this.customerService.getAllCommune(parseInt(this.customer.district)).subscribe(next => {
        this.commune = next.data.data.filter(n => n.code == parseInt(this.customer.commune))[0].name;
      });
    });
  }
}
