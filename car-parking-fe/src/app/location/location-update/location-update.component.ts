import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../service/location.service";
import {FloorService} from "../../service/floor.service";
import {SectionService} from "../../service/section.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Floor} from "../../model/floor";
import {Section} from "../../model/section";
import {ActivatedRoute, Router} from "@angular/router";
import {ILocation} from "../../model/ilocation";

import {LocationDto} from "../../model/location-dto";

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnInit {

  locationForm: FormGroup;
  floorList: Floor[] = [];
 sectionList1: Section[] = [];
locationList: ILocation[] = [];
 locationId: number = 177
 locationDto: LocationDto
  clickButton: false;
  constructor(private locationService: LocationService,
              private floorService: FloorService,
              private sectionService: SectionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.locationForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl("",[Validators.required, Validators.min(0),Validators.pattern("[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z ]*")]),
      width: new FormControl("",[Validators.required, Validators.min(0),Validators.pattern("[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z ]*")]),
      height: new FormControl("",[Validators.required, Validators.min(0),Validators.pattern("[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z ]*")]),
      length: new FormControl("",[Validators.required, Validators.min(0),Validators.pattern("[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđA-Z ]*")]),
      /*permissionCarTypeLocations: new FormControl(),*/
      floor: new FormControl("",[Validators.required]),
      section: new FormControl("",[Validators.required]),
    })
    this.locationService.findLocationById(this.activatedRoute.snapshot.paramMap.get("id")).subscribe(next => {
      console.log(this.locationForm.patchValue(next));
      console.log(next);

    });
    this.floorService.getAllFloor().subscribe(data =>{
      this.floorList = data;
    })
    this.sectionService.getAllSection1().subscribe(data =>{
      this.sectionList1 = data
      console.log(data)
    })
    this.locationService.getAll(this.locationId).subscribe(data =>{
      this.locationDto = data
    })

  }
  compareFun(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  compareFun1(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }


  ngOnInit(): void {
  }
  editLocation(){
    if (this.locationForm.valid){
      this.locationService.editLocation(this.locationForm.value.id, this.locationForm.value).subscribe(data =>{
      console.log(data)
       alert("chỉnh sửa thành công")
        this.router.navigateByUrl("/list")
      })
    }

  }

}

