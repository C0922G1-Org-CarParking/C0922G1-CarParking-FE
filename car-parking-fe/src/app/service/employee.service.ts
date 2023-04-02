import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

import {Employee} from '../model/employee';
import {Observable} from 'rxjs';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiList = 'http://localhost:8080/api/list-employee';
  private apiDelete = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }


  addEmployee(employee: Employee) {
    return this.http.post('http://localhost:8080/api/create-employee', employee);
  }

  findById(id: number): Observable<Employee> {
    return this.http.get<Employee>('http://localhost:8080/api/' + id);
  }

  edit(value: any) {
    return this.http.patch('http://localhost:8080/api/update-employee/' + value.id, value);
  }



  getAllProvince(): Observable<any> {
    return this.http.get<any>('https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1');
  }

  getAllDistrict(province: number): Observable<any> {
    return this.http.get<any>('https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=' + province + '&limit=-1');
  }

  getAllCommune(district: number): Observable<any> {
    return this.http.get<any>('https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=' + district + '&limit=-1');
  }


  getAllEmployee(
    page: number = 0,
    size: number ,
    nameSearch: string = '',
    startDate: string = '',
    endDate: string = ''
  ): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      this.apiList +
      '?page=' +
      page +
      '&size=' +
      size +
      '&name=' +
      nameSearch +
      '&startDate=' +
      startDate +
      '&endDate=' +
      endDate
    );
  }


  deleteById(id: number) {
    return this.http.delete(this.apiDelete + id);
  }

}
