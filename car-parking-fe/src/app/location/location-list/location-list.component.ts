import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../service/location.service';
import {ILocation} from '../../model/ilocation';
import {Page} from 'ngx-pagination/dist/pagination-controls.directive';
import {FormControl, FormGroup} from "@angular/forms";
import {LocationDto} from "../../dto/location-dto";
import Swal from 'sweetalert2'
import {Floor} from "../../model/floor";
import {FloorService} from "../../service/floor.service";


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

  searchInput = '';
  locationList: LocationDto [] = [];
  totalPage: number;
  size: number = 0;
  search: string = '';
  p: number = 0;
  idDelete: number;

  formGroup: FormGroup;
  pages: number[] = [];
  role: string = '';
  location: LocationDto = {}

  formLocation: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    documentName: new FormControl()
  })

  floorList: Floor[] = [];

  constructor(private locationService: LocationService,
              private floorService: FloorService) {
    this.getAllFloor();
  }


  ngOnInit(): void {
    this.getAll(this.page);

  }

  getAllFloor() {
    this.floorService.getAllFloor().subscribe(next => {
      // @ts-ignore
      this.floorList = next;
    })
  }

  getAll(page: number) {
    this.locationService.getAllLocation(this.searchInput.trim(), page).subscribe(data => {
      // alert(data);
      // @ts-ignore
      this.locationList = data.content;
      // @ts-ignore
      this.pageCount = data.totalPages;
      // alert(this.pageCount);
      this.pageNumbers = Array.from({length: this.pageCount}, (v, k) => k + 1);
      // alert(this.pageNumbers);
      // @ts-ignore
      this.locationList = data['content'];
      // @ts-ignore
      this.totalPage = data['totalPages'];
      // @ts-ignore
      this.p = data['number'];
      // @ts-ignore
      this.size = data['size'];
    }, error => {
      this.locationList = null;
    });


  }

  searchLocation(search: string) {
    this.page = 0;
    // this.ngOnInit();
    this.searchInput = search;
    this.locationList = [];
    // this.locationService.getAllLocation(this.searchInput, 0).subscribe(data => {
    //   this.locationList = data['content'];
    //   this.totalPage = data['totalPages'];
    //   this.p = data['number'];
    //   this.size = data['size'];
    this.getAll(this.page);
    // console.log(data);
    // });
  }
  resetPage(){

  }

  deleteLocation(id: any) {
    if (id!= null) {
      this.locationService.deleteLocation(id).subscribe(data => {
        // alert("Xóa thành công");
        Swal.fire('Xóa thành công', '', 'success')
        this.getAll(this.p);
      })
    } else {
      alert("Xóa không thành công");
    }

  }

  // delete(id: number) {
  //   this.locationService.deleteLocation(this.location.id).subscribe(next => {
  //     Swal.fire('Xóa thành công', '', 'success')
  //     this.ngOnInit();
  //   })
  // }


  get pageNumbersToDisplay() {

    const currentPageIndex = this.page;
    const totalPageCount = this.pageCount;
    const pagesToShow = 3;

    if (totalPageCount <= pagesToShow) {
      return Array.from({length: totalPageCount}, (_, i) => i + 1);
    }

    const startPage = Math.max(0, currentPageIndex - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage >= totalPageCount) {
      endPage = totalPageCount - 1;
    }

    let pageNumbersToDisplay: (number | string)[] = Array.from({length: endPage - startPage + 1}, (_, i) => i + startPage + 1);

    if (startPage > 0) {
      pageNumbersToDisplay = ['...', ...pageNumbersToDisplay];
    }

    if (endPage < totalPageCount - 1) {
      pageNumbersToDisplay = [...pageNumbersToDisplay, '...'];
    }

    return pageNumbersToDisplay;
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
    }
    this.getAll(this.page);
  }

  nextPage() {
    if (this.page < this.pageCount - 1) {
      this.page++;
    }
    this.getAll(this.page);
  }

  goToPage(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.page = pageNumber - 1;
    }
    this.getAll(this.page);
  }

  resetHome() {
   this.ngOnInit();
  }
}
