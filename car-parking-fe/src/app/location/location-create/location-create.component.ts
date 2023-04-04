import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../service/location.service";
import {FloorService} from "../../service/floor.service";
import {SectionService} from "../../service/section.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Floor} from "../../model/floor";
import {Section} from "../../model/section";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent implements OnInit {

  locationForm: FormGroup;
  floorList: Floor[] = [];
  sectionList: Section[] = [];
  clickButton: false;
  public isSelectedFloor;
  public isFullSection;
  floor: Floor;

  constructor(private locationService: LocationService,
              private floorService: FloorService,
              private sectionService: SectionService,
              private router: Router) {
    this.locationForm = new FormGroup({
      width: new FormControl("",[Validators.required, Validators.min(0)]),
      height: new FormControl("",[Validators.required, Validators.min(0)]),
      length: new FormControl("",[Validators.required, Validators.min(0)]),
      car4: new FormControl("",[Validators.required]),
      car7: new FormControl("",[Validators.required]),
      permissionCarTypeLocations: new FormControl("",[Validators.required]),
      otherCarSelected: new FormControl("",[Validators.required]),
      otherCar: new FormControl(),
      floor: new FormControl("",[Validators.required]),
      section: new FormControl("",[Validators.required]),
    })
    this.floorService.getAllFloor().subscribe(data =>{
      this.floorList = data;
    })
  }

  ngOnInit(): void {
  }

  addLocation(){
    const selectedCars = [];
    if (this.locationForm.get('car4').value) {
      selectedCars.push('Xe 4 chỗ');
    }
    if (this.locationForm.get('car7').value) {
      selectedCars.push('Xe 7 chỗ');
    }
    if (this.locationForm.get('otherCarSelected').value) {
      selectedCars.push(this.locationForm.get('otherCar').value);
    }
/*
    alert(selectedCars)
*/
    this.locationForm.get('permissionCarTypeLocations').setValue(selectedCars)
    if (this.locationForm.valid){}
    this.locationService.createLocation(this.locationForm.value).subscribe(data =>{
      console.log(data)
      Swal.fire('Thêm mới vị trí thành công','','success')
      this.router.navigateByUrl("/list")
    })
  }

  findSection(event: any) {
    this.floor = this.locationForm.get('floor').value;
    this.sectionList = null;
    this.isSelectedFloor = true;
    this.sectionService.getAllSection(this.floor.id).subscribe((sectionList) => {
       this.sectionList = sectionList;
    })
    if (this.sectionList) {
        this.isFullSection = true;
    }
  }
}
