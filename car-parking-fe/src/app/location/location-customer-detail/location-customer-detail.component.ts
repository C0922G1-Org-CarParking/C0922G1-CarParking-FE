import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../service/location.service";
import {LocationDetailDto} from "../../model/location-detail-dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-location-customer-detail',
  templateUrl: './location-customer-detail.component.html',
  styleUrls: ['./location-customer-detail.component.css']
})
export class LocationCustomerDetailComponent implements OnInit {
  locationDetailDto: LocationDetailDto

  constructor(private locationService: LocationService, private activatedRoute: ActivatedRoute) {
  }

  id: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id')
    })
    this.findByLIdLocationAndCustomerDetail()
  }

  findByLIdLocationAndCustomerDetail() {
    this.locationService.findByLIdLocationAndCustomerDetail(this.id).subscribe(param => {
      this.locationDetailDto = param;
    })
  }

}
