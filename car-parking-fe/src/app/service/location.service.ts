import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {LocationDetailDto} from "../model/location-detail-dto";
import {ILocation} from "../model/ilocation";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }
  findByLIdLocationAndCustomerDetail(id: number):Observable<LocationDetailDto>{
    return this.http.get<LocationDetailDto>('http://localhost:8080/location/findLocationById?id=' + id)
  }
  findAllLocationInFloor(id: number): Observable<ILocation[]> {
    return this.http.get<ILocation[]>('http://localhost:8080/location/mapParking?id=' + id);
  }

}
