import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Customer} from "../model/customer";
import {Car} from "../model/car";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }

  searchName(name: string): Observable<Customer[]> {
    return this.http.get<Customer[]>('http://localhost:8080/ticket/listSearchCustomer?name=' + name);
  }

  findCustomerById(id: number) {
    return this.http.get<Customer>('http://localhost:8080/ticket/chooseCustomer/' + id);
  }

  getCarListOfCustomerById(id: number):Observable<Car[]> {
    return this.http.get<Car[]>('http://localhost:8080/ticket/findCarListOfCustomerId/' + id);
  }
}
