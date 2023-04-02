import {Component, OnInit} from '@angular/core';
import {LocationDetailDto} from "../../model/location-detail-dto";
import {LocationService} from "../../service/location.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ILocation} from "../../model/ilocation";

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  locationDetailDto: LocationDetailDto
  location: ILocation;

  constructor(private locationService: LocationService, private activatedRoute: ActivatedRoute, private route: Router) {
  }

  idEditTicket = 0;
  id: number;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id')
    });
    this.activatedRoute.paramMap.subscribe(param => {
      this.idEditTicket = +param.get('id');
    })
    this.findByLIdLocationAndCustomerDetail()
  }

  findByLIdLocationAndCustomerDetail() {
    this.locationService.findLocationByIdAndCustomerDetail(this.id).subscribe(param => {
      this.locationDetailDto = param;
    }, error => {
      this.locationService.findLocationEmptyById(this.id).subscribe(param => {
        this.location = param;
      })
    })
  }

  addTicket(idLocation: number) {
    if (this.idEditTicket == 0) {
      this.route.navigateByUrl('ticket/create/' + idLocation)
    } else if (this.idEditTicket == 1) {
      this.route.navigateByUrl('ticket/edit/' + idLocation)
    }


  }
}
