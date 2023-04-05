import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarTicket} from '../model/car-ticket';
import {Car} from '../model/car';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) {
  }

  findCarByCustomerId(customerId: number): Observable<CarTicket[]> {
    return this.http.get<CarTicket[]>('http://localhost:8080/api/user/car/info/' + customerId)
  }

  findCarById(id: number): Observable<Car[]> {
    return this.http.get<Car[]>(`http://localhost:8080/api/user/customer/car/${id}`)
  }
}

