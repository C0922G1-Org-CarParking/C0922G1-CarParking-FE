import {Component, OnInit} from '@angular/core';
import {LocationDetailDto} from "../../model/location-detail-dto";
import {LocationService} from "../../service/location.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ILocation} from "../../model/ilocation";
import Swal from "sweetalert2";


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
check:number

  id: number;

  ngOnInit(): void {
    // đây
    this.activatedRoute.paramMap.subscribe(next=>{
      this.check= +next.get('check')
    });
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id')
    });
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
      this.route.navigateByUrl('ticket/create/' + idLocation)

  }
// thêm đây
  linkComponent() {
    if (this.check==0){
      this.route.navigateByUrl('location/list' )
    }else {
      this.route.navigateByUrl('location/mapParking/0' )
    }
  }
}
