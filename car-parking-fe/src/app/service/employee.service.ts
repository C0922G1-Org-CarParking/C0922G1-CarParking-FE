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
}
