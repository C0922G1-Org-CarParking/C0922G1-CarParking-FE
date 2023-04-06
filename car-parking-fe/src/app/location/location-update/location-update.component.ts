import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../service/location.service';
import {FloorService} from '../../service/floor.service';
import {SectionService} from '../../service/section.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Floor} from '../../model/floor';
import {Section} from '../../model/section';
import {ActivatedRoute, Router} from '@angular/router';
import {ILocation} from '../../model/ilocation';
import Swal from 'sweetalert2';
import {LocationDto} from '../../model/location-dto';

@Component({
  selector: 'app-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css']
})
export class LocationUpdateComponent implements OnInit {
  carType = '';
  locationForm: FormGroup;
  floorList: Floor[] = [];
  sectionList1: Section[] = [];
  locationList: ILocation[] = [];
  locationDto: LocationDto;
  clickButton: false;
  permissionCarTypeLocations: string;
  private key: any;
  private string: any;
  private boolean: any;

  constructor(private locationService: LocationService,
              private floorService: FloorService,
              private sectionService: SectionService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.locationForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.min(0)]),
      width: new FormControl('', [Validators.required, Validators.min(0)]),
      height: new FormControl('', [Validators.required, Validators.min(0)]),
      length: new FormControl('', [Validators.required, Validators.min(0)]),
      car4: new FormControl('', [Validators.required]),
      car7: new FormControl('', [Validators.required]),
      permissionCarTypeLocations: new FormControl('', [Validators.required]),
      otherCarSelected: new FormControl('', [Validators.required]),
      otherCar: new FormControl(),
      floor: new FormControl('', [Validators.required]),
      section: new FormControl('', [Validators.required]),
    });

    this.locationService.findLocationById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(next => {
      console.log(this.locationForm.patchValue(next));
      const carType = next.permissionCarTypeLocations.split(',');
      console.log(carType);
      console.log(this.carType);
      this.locationForm.patchValue({
        car4: carType[0],
        car7: carType[1],
        otherCarSelected: carType[2],
        otherCar: carType[3]
      });
    });
    this.floorService.getAllFloor().subscribe(data => {
      this.floorList = data;
    });
    this.sectionService.getAllSection1().subscribe(data => {
      this.sectionList1 = data;
    });
    this.locationService.getAll(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(data => {
      this.locationDto = data;
    });

  }
  async compareFun(item1, item2) {
    return await item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  compareFun1(item1, item2) {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }


  ngOnInit(): void {
  }

  editLocation() {
    const selectedCars = ['', '', '', ''];
    if (this.locationForm.get('car4').value) {
      selectedCars[0] = 'Xe 4 chỗ';
    }
    if (this.locationForm.get('car7').value) {
      selectedCars[1] = 'Xe 7 chỗ';
    }
    if (this.locationForm.get('otherCarSelected').value) {
      selectedCars[2] = 'otherCarSelected';
    }
    if (this.locationForm.get('otherCar').value) {
      selectedCars[3] = this.locationForm.get('otherCar').value;
    }
    const selectedCarsStr = selectedCars.join(',');
    console.log(selectedCarsStr);
    this.locationForm.get('permissionCarTypeLocations').setValue(selectedCarsStr);
    if (this.locationForm.valid) {
      this.locationService.editLocation(this.locationForm.value.id, this.locationForm.value).subscribe(data => {
        Swal.fire('Chỉnh sửa vị trí thành công', '', 'success');
        alert(this.permissionCarTypeLocations);
        this.router.navigateByUrl('/list');
      });
    } else {
      Swal.fire('Chỉnh sửa vị trí thất bại', '', 'error');
    }

  }

}
