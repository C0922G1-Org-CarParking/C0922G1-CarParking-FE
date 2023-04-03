import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICarInOut} from "../model/i-car-in-out";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarInOutService {

  URL_SEARCH_CAR_IN_BY_NAME_BY_PHONE_BY_PLATE_NUMBER = "http://localhost:8080/car-in-out/list-car-in";
  URL_SEARCH_CAR_OUT_BY_NAME_BY_PHONE_BY_PLATE_NUMBER = "http://localhost:8080/car-in-out/list-car-out";
  constructor(private http: HttpClient) {
  }

  searchCarIn( customerName: string, customerPhoneNumber: string, carPlateNumber: string): Observable<any> {
    return this.http.get(this.URL_SEARCH_CAR_IN_BY_NAME_BY_PHONE_BY_PLATE_NUMBER + '?customerName=' + customerName + '&customerPhoneNumber=' + customerPhoneNumber + '&carPlateNumber=' + carPlateNumber )
  }

  searchCarOut(customerName: string, customerPhoneNumber: string, carPlateNumber: string): Observable<any> {
    return this.http.get(this.URL_SEARCH_CAR_OUT_BY_NAME_BY_PHONE_BY_PLATE_NUMBER + '?customerName=' + customerName + '&customerPhoneNumber=' + customerPhoneNumber + '&carPlateNumber=' + carPlateNumber )
  }

}
