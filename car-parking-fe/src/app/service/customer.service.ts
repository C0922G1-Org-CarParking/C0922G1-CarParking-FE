import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {Car} from "../model/car";
import {CustomerCar} from "../model/customer-car";
import {CustomerAndCar} from "../model/customer-and-car";
import {CustomerVu} from "../model/customer-vu";


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

  /**
   * Create by: VuTN,
   * Date create : 02/04/2023
   *
   */

  updateCustomer(id: number, customerAndCar: CustomerAndCar): Observable<CustomerAndCar> {

    return this.http.put<CustomerAndCar>(`http://localhost:8080/customer/update/${id}`, customerAndCar)
  }
  findCustomerById(id: number): Observable<CustomerVu>{
    return  this.http.get<CustomerVu>('http://localhost:8080/customer/findCustomer/' + id)
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

  // getAll(name: string, idCard: string, phoneNumber: string, starDate: string, endDate: string, page: number, pageSize: number): Observable<Page<Customer>> {
  //   return this.http.get<Page<Customer>>('http://localhost:8080/customer/list?page=' + page + '&pageSize=' + pageSize
  //     + '&name=' + name + '&idCard=' + idCard + '&phoneNumber=' + phoneNumber + '&starDate=' + starDate + '&endDate=' + endDate);
  // }

  // sendEmail(toMail: string, id: number): Observable<string> {
  //   return this.http.post<string>('http://localhost:8080/customer/send?to=' + toMail, id);
  // }

  // deleteCustomer(id: number): Observable<string> {
  //   return this.http.delete<string>('http://localhost:8080/customer/' + id + '/delete');
  // }
  getAll(name: string, idCard: string, phoneNumber: string, starDate: string, endDate: string, page: number, pageSize: number): Observable<Page<Customer>> {
    return this.http.get<Page<Customer>>('http://localhost:8080/customer/list?page=' + page + '&pageSize=' + pageSize
      + '&name=' + name + '&idCard=' + idCard + '&phoneNumber=' + phoneNumber + '&starDate=' + starDate + '&endDate=' + endDate);
  }

  sendEmail(toMail: string, id: number): Observable<string> {
    return this.http.post<string>('http://localhost:8080/customer/send?to=' + toMail, id);
  }

  deleteCustomer(id: number): Observable<string> {
    return this.http.delete<string>('http://localhost:8080/customer/' + id + '/delete');
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
