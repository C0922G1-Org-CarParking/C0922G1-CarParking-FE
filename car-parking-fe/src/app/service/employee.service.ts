import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private apiList = 'http://localhost:8080/api/list-employee';
  private apiDelete = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
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
  //
  // searchDateOfBirth( startDate: string, endDate: string, page: number): Observable<Employee[]> {
  //   debugger
  //       return this.http.get<Employee[]>(this.apiList  + '?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page +'&size=3' );
  //
  // }
  //
  // searchByName( nameSearch: string, page: number): Observable<Employee[]> {
  //   debugger
  //   return this.http.get<Employee[]>(this.apiList + '?name=' + nameSearch  + '&page=' + page +'&size=3')
  // }
  //
  // searchAll(nameSearch: string, startDate: string, endDate: string, page: number): Observable<Employee[]> {
  //   debugger
  //   return this.http.get<Employee[]>(this.apiList  + '?startDate=' + startDate + '&endDate=' + endDate + '&page=' + page +'&size=3')
  // }

}
