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


  constructor(private http: HttpClient) {
  }

  listEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/ticket/listEmployee');
  }
}
