import {Component, OnInit} from '@angular/core';
import {LocationService} from "../../service/location.service";
import {ILocation} from "../../model/ilocation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {
  idFloor = 1;
  listLocation: ILocation[];
  flag = false;
  checkError = false;
  locationEmpty = 0;
  totalPage = 4;
  showDetailLocation: String;

  constructor(private locationService: LocationService, private route: Router) {
  }

  ngOnInit(): void {
    this.findAllLocationInFloor();

  }

  findAllLocationInFloor() {

    this.locationService.findAllLocationInFloor(this.idFloor).subscribe(param => {
      this.listLocation = param;
      this.checkError = false;
      this.findLocationIsEmpty();
    }, error => {
      this.listLocation = null;
      this.checkError = true;

    })

  }

  redirectRouter(id: number, occupied: boolean) {
    if (occupied) {
      this.route.navigateByUrl('/location/detail/' + id)
    } else {
      this.route.navigateByUrl('ticket/create/' + id)
    }
  }

  findLocationIsEmpty() {
    this.locationEmpty = 0;
    for (let i = 0; i < this.listLocation.length; i++) {
      if (!this.listLocation[i].occupied) {
        this.locationEmpty += 1;
      }
    }
  }

  previous() {
    this.idFloor--;
    this.findAllLocationInFloor();
  }

  total() {
    this.idFloor = 4;
    this.findAllLocationInFloor();
  }

  next() {
    this.idFloor++;
    this.findAllLocationInFloor();
  }

  show(length: number, width: number, height: number) {
    this.showDetailLocation ="Chiều dài : " + length +" m" +
      "\nChiều rộng : " + width +" m" +
      "\nChiều cao : " + height +"m";
  }

  hiddenInformation() {
    this.showDetailLocation = ""
  }
}
