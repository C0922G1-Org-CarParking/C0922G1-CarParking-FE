import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../service/location.service';
import {ILocation} from '../../model/ilocation';
import {Page} from 'ngx-pagination/dist/pagination-controls.directive';
import {FormControl, FormGroup} from "@angular/forms";
import {LocationDto} from "../../dto/location-dto";
import Swal from 'sweetalert2'


@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  page = 0;
  pageSize = 5;
  pageCount = 0;
  pageNumbers: number[] = [];

  locationList: LocationDto [] = [];
  totalPage: number;
  size: number = 0;
  search: string = '';
  p: number = 0;
  idDelete: number;

  formGroup: FormGroup;
  pages: number[] = [];
  role: string = '';
  location: ILocation = {}

  formLocation: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    documentName: new FormControl()
  })

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.getAll(this.page);
  }


  getAll(page : number) {
    this.locationService.getAllLocation(this.search.trim(), page).subscribe(data => {
      // @ts-ignore
      this.locationList = data.content;
      // @ts-ignore
      this.pageCount = data.totalPages;
      this.pageNumbers = Array.from({length: this.pageCount}, (v, k) => k + 1);
      // @ts-ignore
      this.locationList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
    }, error => {
      this.locationList=null;
    });


  }


  searchLocation(value: string) {
    // this.p = 0;
    // this.ngOnInit();
    this.locationList = [];
    this.locationService.getAllLocation(value, 0).subscribe(data => {
      this.locationList = data['content'];
      this.totalPage = data['totalPages'];
      this.p = data['number'];
      this.size = data['size'];
      console.log(data);
    });


  }

  deleteLocation() {
    if (this.idDelete != null) {
      this.locationService.deleteLocation(this.idDelete).subscribe(data => {
        // alert("Xóa thành công");
        Swal.fire('Xóa thành công','','success')
        this.getAll(this.p);
      })
    } else {
      alert("Xóa không thành công");
    }
    // this.groundFootballDtoService.deleteGF(id).subscribe(data => {
    //   if (data != null) {
    //     console.log(data);
    //     alert("Xóa thành công")
    //   }
    // }, error => {
    //   alert("Xóa thất bại")
    // });
  }

  delete(id: number) {
    this.idDelete = id;
  }



  // locationList: ;
  // search = '';
  // page = 0;
  // nums;
  //
  //
  // constructor(private locationService: LocationService) {
  //
  // }
  //
  // ngOnInit(): void {
  //   this.getAll(this.search, this.page);
  // }
  //
  // getAll(search: string, page: number) {
  //   return this.locationService.getAllLocation(search, page).subscribext => {
  //     r
  //   });
  // }
  pageFloor: number;


  // previous() {
  //   this.pageFloor--
  //   this.getAll(this.pageFloor);
  //
  //
  // }
  //
  // next() {
  //   this.pageFloor++
  //   this.getAll( this.pageFloor);
  //
  // }
  // pageChange(number: number) {
  //
  //   this.pageFloor=number
  //   this.getAll(number);
  // }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.getAll(this.page);
    }
  }

  nextPage() {
    if (this.page < (this.pageCount - 1)) {
      this.page++;
      this.getAll(this.page);
    }
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber - 1;
    this.getAll(this.page);
  }
}
