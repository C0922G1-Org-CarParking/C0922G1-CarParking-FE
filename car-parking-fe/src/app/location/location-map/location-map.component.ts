import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../service/location.service";
import {ILocation} from "../../model/ilocation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {
idFloor= 1;
listLocation: ILocation[];
flag= false;
checkError= false;
locationEmpty = 0;
  constructor(private locationService: LocationService, private route: Router) { }

  ngOnInit(): void {
    this.findAllLocationInFloor();

  }
 findAllLocationInFloor(){
    this.locationService.findAllLocationInFloor(this.idFloor).subscribe(param =>{
      this.listLocation= param;
      this.findLocationIsEmpty();
    }, error => {
      this.checkError= true;
    })

 }

  moverOver() {
    this.flag=true;
  }

  moverLeave() {
    this.flag=false;
  }

  redirectRouter(id: number, occupied: boolean) {
    if(occupied){
      this.route.navigateByUrl('/location/detailLocationWithCustomer/'+id)
    }
    else{

    }
  }
  findLocationIsEmpty(){
    for (let i = 0; i <this.listLocation.length ; i++) {
      if(!this.listLocation[i].occupied){
        this.locationEmpty +=1 ;
      }
    }
  }
}
