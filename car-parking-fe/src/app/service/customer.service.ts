import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {Car} from "../model/car";
import {CustomerCar} from "../model/customer-car";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  findByCustomerId(customerId: number): Observable<Customer> {
    return this.http.get<Customer>('http://localhost:8080/customer/info/' + customerId)
  }

  createCustomer(customer: Customer, cars: Car[]) {
    const data: CustomerCar  ={
      customerDto: customer,
      carDtos: cars
    };
    console.log(data)
    return this.http.post<any>("http://localhost:8080/customer/create", data)
  }

  // createCustomer(cars: any) {
  //   debugger
  //   return this.http.post<any>("http://localhost:8080/customer/create", cars)
  // }

  getAllProvince(): Observable<any> {
    return this.http.get<any>("https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1")
  }

  getAllDistrict(province: number): Observable<any> {
    return this.http.get<any>("https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=" + province + "&limit=-1")
  }

  getAllCommune(district: number): Observable<any> {
    return this.http.get<any>("https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=" + district + "&limit=-1")
  }
}
