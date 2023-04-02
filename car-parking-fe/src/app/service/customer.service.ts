import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer';

const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {
  }
  getAll(name: string, idCard: string, phoneNumber: string, starDate: string, endDate: string, page: number, pageSize: number): Observable<Page<Customer>> {
    return this.http.get<Page<Customer>>('http://localhost:8080/customerRest/list?page=' + page + '&pageSize=' + pageSize
      + '&name=' + name + '&idCard=' + idCard + '&phoneNumber=' + phoneNumber + '&starDate=' + starDate + '&endDate=' + endDate);
  }

  findCustomerbyId(id: number): Observable<Customer> {
    return this.http.get<Customer>('http://localhost:8080/customerRest/' + id);
  }

  deleteCustomer(id: number): Observable<string> {
    return this.http.delete<string>('http://localhost:8080/customerRest/' + id + '/delete');
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
