import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Employee} from "../model/employee";
import {Observable} from "rxjs";
import {LocationDetailDto} from "../model/location-detail-dto";
import {ILocation} from '../model/ilocation';
// @ts-ignore
import {Page} from 'ngx-pagination/dist/pagination-controls.directive';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }
// TheNV
  findLocationByIdAndCustomerDetail(id: number):Observable<LocationDetailDto>{
    return this.http.get<LocationDetailDto>('http://localhost:8080/location/findLocationById?id=' + id)
  }
  // TheNV
  findAllLocationInFloor(id: number): Observable<ILocation[]> {
    return this.http.get<ILocation[]>('http://localhost:8080/location/mapParking?idFloor=' + id);
  }
  // TheNV
  findLocationEmptyById(id: number):Observable<ILocation>{
    return this.http.get<ILocation>('http://localhost:8080/location/findLocationEmptyById?id=' + id)
  }


  createLocation(location: ILocation){
    return this.http.post("http://localhost:8080/location/create", location);
  }

  editLocation(id: number, location: Location): Observable<any> {
    return this.http.patch<any>("http://localhost:8080/location/edit/" + id, location);
  }
  findLocationById(id): Observable<any> {
    return this.http.get<any>("http://localhost:8080/location/" + id);

  }
  getAll(id: number){
    return this.http.get<any>("http://localhost:8080/location/info/" + id)
  }


  getAllLocation(search: string, page: number): Observable<Page> {
    // alert(search)
    return this.http.get<Page>('http://localhost:8080/location/list?search=' + search + '&page=' + page);
  }

  deleteLocation(id: number): Observable<Page> {
    return this.http.delete<Page>('http://localhost:8080/location/delete/' + id);
  }

}
export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;

}
